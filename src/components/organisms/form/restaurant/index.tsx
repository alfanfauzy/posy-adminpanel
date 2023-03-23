/**
 * Restaurant Form Modal
 */
import React, { useEffect, useMemo } from 'react'
import { Button, Input, Select } from 'posy-fnb-core'
import { AiOutlineCheckSquare } from 'react-icons/ai'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import { FormRestaurantEntities } from './entities'
import { useForm } from '@/hooks/useForm'
import {
  EditRestaurantFormSchema,
  RestaurantFormSchema,
} from '@/schemas/restaurant'
import HRLine from '@/atoms/horizontalLine'
import { useGetSubscriptionViewModal } from '@/view/subscription/view-modals/GetSubscriptionViewModel'
import { GetAccessListDataResponse } from '@/data/access/types'
import { GetSubscriptionFilterInput } from '@/domain/subscription/repositories/SubscriptionRepository'
import { useCreateRestaurantViewModal } from '@/view/restaurant/view-models/CreateRestaurantViewModel'
import { TimetoUnix } from '@/constants/utils'
import { Restaurant } from '@/domain/restaurant/models'
import { useUpdateRestaurantViewModal } from '@/view/restaurant/view-models/UpdateRestaurantViewModel'
import { GetSubscriptionListDataResponse } from '@/data/subscription/types'

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
  const FormSchema = isEdit ? EditRestaurantFormSchema : RestaurantFormSchema

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    schema: FormSchema,
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

  const { updateRestaurant, isLoading: isLoadingUpdate } =
    useUpdateRestaurantViewModal({
      onSuccess() {
        handleCloseModal()
        toast.success('Sucessfully edit Restaurant')
      },
    })

  const handleSubmitForm = (data: FormRestaurantEntities) => {
    const formData = new FormData()

    const isEmptyFile =
      data.restaurant_logo?.length === 0 ||
      data.nib?.length === 0 ||
      data.npwp?.length === 0

    if (isEmptyFile) {
      toast.error('Please select a valid file')
      return
    }

    formData.append('restaurant_name', data.restaurant_name)
    formData.append('restaurant_code', data.restaurant_code)
    formData.append('restaurant_address', data.restaurant_address)
    formData.append('restaurant_email', data.restaurant_email)
    formData.append('restaurant_description', data.restaurant_description)
    formData.append('restaurant_phone', data.restaurant_phone)
    formData.append('start_date', TimetoUnix(data.start_date).toString())

    formData.append('owner_name', data.owner_name)
    formData.append('owner_phone', data.owner_phone)
    formData.append('subscription_uuid', data.subscription_uuid.value)
    formData.append('restaurant_logo', data?.restaurant_logo[0])
    formData.append('nib', data?.nib[0])
    formData.append('npwp', data?.npwp[0])

    if (isEdit) {
      const newPayload = {
        id: selectedData.uuid,
        payload: formData,
      }
      updateRestaurant(newPayload)
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
        seconds,
        subscription_uuid,
      } = selectedData

      if (ListSubscription) {
        const getSubscription: GetSubscriptionListDataResponse[] =
          Object.values(ListSubscription)
            .map((datafilter) => datafilter)
            .filter(
              (data: GetSubscriptionListDataResponse) =>
                data.uuid === subscription_uuid,
            )

        setValue('subscription_uuid', {
          label: 'Subscription 1 Bulan',
          value: '40d4bfd5-5039-49ef-816f-c9b03ff81c35',
          // label: getSubscription?.[0].subscription_name,
          // value: getSubscription?.[0].uuid,
        })

        setValue('restaurant_name', name)
        setValue('restaurant_code', code)
        setValue('restaurant_email', email)
        setValue('restaurant_phone', phone)
        setValue('restaurant_address', address)
        setValue('restaurant_description', description)
        setValue('owner_name', pic_name)
        setValue('owner_phone', pic_phone)
        setValue('start_date', seconds)
      }
    }
  }, [selectedData, isEdit, setValue])

  const titleText = isEdit ? 'Edit Restaurant' : 'Create New Restaurant'

  return (
    <ModalForm
      isOpenModal={isOpenModal}
      handleCloseModal={handleCloseModal}
      title={titleText}
    >
      <section className="w-[800px] p-4">
        <form
          onSubmit={handleSubmit((data) => handleSubmitForm(data))}
          encType="multipart/form-data"
        >
          <div className="flex gap-2">
            <div className="w-1/3 border-r-2 pr-2">
              <Input
                {...register('restaurant_logo')}
                className="w-full"
                labelText="Restaurant Logo:"
                type="file"
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
                  <Input
                    {...register('npwp')}
                    className="w-full"
                    labelText="NPWP: "
                    type="file"
                  />
                </div>
              </div>
              <div className="h-full w-1/2">
                <div className="flex flex-col justify-center gap-2">
                  <Input
                    {...register('nib')}
                    className="w-full"
                    labelText="NIB: "
                    type="file"
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
            isLoading={isLoadingCreate || isLoadingUpdate}
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
