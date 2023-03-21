/**
 * Restaurant Form Modal
 */
import React, { useEffect, useMemo, useRef } from 'react'
import { Button, Input, Select } from 'posy-fnb-core'
import { AiOutlineCheckSquare } from 'react-icons/ai'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import { FormRestaurantEntities } from './entities'
import { useForm } from '@/hooks/useForm'
import { RestaurantFormSchema } from '@/schemas/restaurant'
import HRLine from '@/atoms/horizontalLine'
import { useGetSubscriptionViewModal } from '@/view/subscription/view-modals/GetSubscriptionViewModel'
import { GetAccessListDataResponse } from '@/data/access/types'
import { GetSubscriptionFilterInput } from '@/domain/subscription/repositories/SubscriptionRepository'
import MoleculesFileUploader from '@/molecules/fileUpload'
import { useCreateRestaurantViewModal } from '@/view/restaurant/view-models/CreateRestaurantViewModel'
import { TimetoUnix } from '@/constants/utils'
import { Restaurant } from '@/domain/restaurant/models'

const ModalForm = dynamic(() => import('@/molecules/modal/form'), {
  ssr: false,
})

interface MoleculesFormRestaurantProps {
  isEdit: boolean
  isOpenModal: boolean
  handleClose: () => void
  selectedData: Restaurant | Record<string, never>
  handleRefetch: () => void
}

const MoleculesFormRestaurant = ({
  isEdit,
  isOpenModal,
  handleClose,
  selectedData,
  handleRefetch,
}: MoleculesFormRestaurantProps) => {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    schema: RestaurantFormSchema,
    mode: 'onChange',
  })

  const hooksParams: GetSubscriptionFilterInput = {
    search: [],
    sort: { field: 'created_at', value: 'desc' },
    page: 0,
    limit: 0,
  }

  const { data: ListSubscription, isLoading: isLoadingSubscription } =
    useGetSubscriptionViewModal(hooksParams)

  const SubscriptionSelect = useMemo(() => {
    if (!ListSubscription) return []

    return Object.values(ListSubscription).map(
      (role: GetAccessListDataResponse) => ({
        label: role.name,
        value: role.uuid,
      }),
    )
  }, [ListSubscription])

  const handleCloseModal = () => {
    reset()
    handleClose()
    handleRefetch()
  }

  const { createRestaurant, isLoading: isLoadingCreate } =
    useCreateRestaurantViewModal({
      onSuccess() {
        handleCloseModal()
        toast.success('Sucessfully added new Restaurant')
      },
    })

  const handleEditRestaurant = (data: FormRestaurantEntities) => {
    /**
     * Todo : Send `data` to backend
     */
    if (data) {
      handleCloseModal()
      toast.success('Sucessfully edit Restaurant')
    }
  }

  const handleSubmitForm = (data: FormRestaurantEntities) => {
    const formData = new FormData()

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'subscription_uuid') {
        formData.append('subscription_uuid', data.subscription_uuid.value)
      } else if (key === 'restaurant_logo') {
        formData.append(
          'restaurant_logo',
          new Blob([data.restaurant_logo as any]),
        )
      } else if (key === 'nib') {
        formData.append('nib', new Blob([data.nib as any]))
      } else if (key === 'npwp') {
        formData.append('npwp', new Blob([data.npwp as any]))
      } else if (key === 'start_date') {
        formData.append('start_date', TimetoUnix(data.start_date).toString())
      } else {
        formData.append(key, value)
      }
    })

    if (isEdit) {
      handleEditRestaurant(data)
    } else {
      createRestaurant(formData)
    }
  }

  useEffect(() => {
    if (isEdit) {
      const {
        name,
        code,
        email,
        phone,
        address,
        description,
        pic_name,
        pic_phone,
        logo,
      } = selectedData

      setValue('restaurant_name', name)
      setValue('restaurant_code', code)
      setValue('restaurant_email', email)
      setValue('restaurant_phone', phone)
      setValue('restaurant_address', address)
      setValue('restaurant_description', description)

      // setValue('restaurant_logo', logo)
      // setValue('nib', nib_image_url)
      // setValue('npwp', npwp_image_url)
      setValue('owner_name', pic_name)
      setValue('owner_phone', pic_phone)
    }
  }, [selectedData, isEdit, setValue])

  const titleText = isEdit ? 'Edit Restaurant' : 'Create New Restaurant'

  const handleChangeFile = (name: any, file: File) => {
    setValue(name, file)
  }

  const handleRemoveFile = (name: any) => {
    setValue(name, '')
  }

  const ref_restaurant_logo = useRef('')
  const ref_npwp = useRef('')
  const ref_nib = useRef('')

  return (
    <ModalForm
      isOpenModal={isOpenModal}
      handleCloseModal={handleCloseModal}
      title={titleText}
    >
      <section className="w-[800px] p-4">
        <form onSubmit={handleSubmit((data) => handleSubmitForm(data))}>
          <div className="flex gap-2">
            <div className="w-1/3 border-r-2 pr-2">
              <MoleculesFileUploader
                {...register('restaurant_logo')}
                fileUrl={selectedData.logo}
                ref={ref_restaurant_logo}
                label="Restaurant Logo:"
                name="restaurant_logo"
                handleSetValue={handleChangeFile}
                handleClearFile={handleRemoveFile}
                error={!!errors.restaurant_logo}
                helperText={errors?.restaurant_logo?.message}
              />
            </div>
            <div className="w-2/3">
              <div className="mb-6">
                <Input
                  {...register('restaurant_code')}
                  className="w-full"
                  labelText="Restaurant Code:"
                  type="text"
                  placeholder="ex: KFC, etx"
                  error={!!errors?.restaurant_code}
                  helperText={errors?.restaurant_code?.message}
                />
              </div>
              <div className="mb-6">
                <Input
                  {...register('restaurant_name')}
                  className="w-full"
                  labelText="Restaurant Name:"
                  type="text"
                  placeholder="ex: Superadmin, etx"
                  error={!!errors?.restaurant_name}
                  helperText={errors?.restaurant_name?.message}
                />
              </div>
              <div className="mb-6">
                <Input
                  {...register('restaurant_email')}
                  className="w-52"
                  labelText="Restaurant email:"
                  type="text"
                  placeholder="ex: mail@restaurant.co.id"
                  error={!!errors?.restaurant_email}
                  helperText={errors?.restaurant_email?.message}
                />
              </div>
              <div className="mb-6">
                <Input
                  {...register('restaurant_phone', {
                    setValueAs: (v) => v.replace(/\D/, ''),
                  })}
                  value={watch('restaurant_phone')}
                  className="w-52"
                  labelText="Restaurant phone:"
                  type="text"
                  placeholder="ex: 082123456789"
                  error={!!errors?.restaurant_phone}
                  helperText={errors?.restaurant_phone?.message}
                />
              </div>
              <div className="mb-6">
                <Input
                  {...register('restaurant_address')}
                  className="w-52"
                  labelText="Restaurant address:"
                  type="text"
                  placeholder="ex: Jl. Raya No. 1"
                  error={!!errors?.restaurant_address}
                  helperText={errors?.restaurant_address?.message}
                />
              </div>
              <div className="mb-6">
                <Input
                  {...register('restaurant_description')}
                  className="w-52"
                  labelText="Restaurant description:"
                  type="text"
                  placeholder="ex: Jl. Raya No. 1"
                  error={!!errors?.restaurant_description}
                  helperText={errors?.restaurant_description?.message}
                />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <HRLine text="Restaurant File" />
            <div className="flex gap-2">
              <div className="h-full w-1/2">
                <div className="flex flex-col justify-center gap-2">
                  <MoleculesFileUploader
                    ref={ref_npwp}
                    fileUrl={selectedData.npwp}
                    label="NPWP:"
                    name="npwp"
                    handleSetValue={handleChangeFile}
                    handleClearFile={handleRemoveFile}
                    error={!!errors.npwp}
                    helperText={errors?.npwp?.message}
                  />
                </div>
              </div>
              <div className="h-full w-1/2">
                <div className="flex flex-col justify-center gap-2">
                  <MoleculesFileUploader
                    {...register('nib')}
                    ref={ref_nib}
                    fileUrl={selectedData.nib}
                    label="NIB:"
                    name="nib"
                    handleSetValue={handleChangeFile}
                    handleClearFile={handleRemoveFile}
                    error={!!errors.nib}
                    helperText={errors?.nib?.message}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <HRLine text="Restaurant Owner" />
            <div className="mb-6">
              <Input
                {...register('owner_name')}
                className="w-full"
                labelText="Owner Name"
                type="text"
                placeholder="ex: Jonh Doe"
                error={!!errors?.owner_name}
                helperText={errors?.owner_name?.message}
              />
            </div>
            <div className="mb-6">
              <Input
                {...register('owner_phone', {
                  setValueAs: (v) => v.replace(/\D/, ''),
                })}
                value={watch('owner_phone')}
                className="w-full"
                labelText="Owner Phone"
                type="text"
                placeholder="ex: 08213456789"
                error={!!errors?.owner_phone}
                helperText={errors?.owner_phone?.message}
              />
            </div>
          </div>
          {!isEdit && (
            <div className="mb-3">
              <HRLine text="Subscription Plan" />
              <div className="flex gap-2">
                <div className="mb-6 w-1/2">
                  <Select
                    name="subscription_uuid"
                    onChange={(e) => setValue('subscription_uuid', e)}
                    options={SubscriptionSelect}
                    labelText="Subscription"
                    placeholder="Select Subscription Plan"
                    className="flex items-center justify-center"
                    error={!!errors.subscription_uuid}
                    helperText={errors?.subscription_uuid?.message}
                    isClearable
                    isLoading={isLoadingSubscription}
                  />
                </div>
                <div className="mb-6 w-1/2">
                  <Input
                    {...register('start_date')}
                    className="w-52"
                    labelText="Start Date:"
                    type="date"
                    placeholder="ex: 3 Maret 2023, etc"
                    error={!!errors?.start_date}
                    helperText={errors?.start_date?.message}
                  />
                </div>
              </div>
            </div>
          )}

          <Button
            isLoading={isLoadingCreate}
            type="submit"
            variant="primary"
            size="l"
            fullWidth
            className="flex items-center justify-center gap-2"
          >
            <AiOutlineCheckSquare />
            Submit
          </Button>
        </form>
      </section>
    </ModalForm>
  )
}

export default MoleculesFormRestaurant
