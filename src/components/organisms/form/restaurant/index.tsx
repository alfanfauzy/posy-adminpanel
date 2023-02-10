/**
 * Restaurant Form Modal
 */
import React, { useEffect } from 'react'
import { Button, Input } from 'posy-fnb-core'
import { AiOutlineCheckSquare } from 'react-icons/ai'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import { FormRestaurantEntities } from './entities'
import { useForm } from '@/hooks/useForm'
import { RestaurantFormSchema } from '@/schemas/restaurant'

const Modal = dynamic(() => import('posy-fnb-core').then((el) => el.Modal), {
  ssr: false,
})

interface MoleculesFormRestaurantProps {
  isEdit: boolean
  isOpenModal: boolean
  handleClose: () => void
  selectedData: any
}

const MoleculesFormRestaurant = ({
  isEdit,
  isOpenModal,
  handleClose,
  selectedData,
}: MoleculesFormRestaurantProps) => {
  const overlay = true

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    schema: RestaurantFormSchema,
    mode: 'onChange',
  })

  const handleCloseModal = () => {
    reset()
    handleClose()
  }

  const handleCreateRestaurant = (data: FormRestaurantEntities) => {
    /**
     * Todo : Send `data` to backend
     */

    /**
     * Will be remove soon
     */

    const getData = JSON.parse(localStorage.getItem('items') || '')

    getData.push(data)

    localStorage.setItem('items', JSON.stringify(getData))

    /** ---------------------------------------------------- */

    if (getData) {
      handleCloseModal()
      toast.success('Sucessfully added new Restaurant')
    }
  }

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
    if (isEdit) {
      handleEditRestaurant(data)
    } else {
      handleCreateRestaurant(data)
    }
  }

  useEffect(() => {
    if (isEdit) {
      const {
        name,
        email,
        phone,
        address,
        nib,
        npwp,
        owner_name,
        owner_phone,
      } = selectedData

      setValue('name', name)
      setValue('email', email)
      setValue('phone', phone)
      setValue('address', address)
      setValue('nib', nib)
      setValue('npwp', npwp)
      setValue('owner_name', owner_name)
      setValue('owner_phone', owner_phone)
    }
  }, [selectedData, isEdit, setValue])

  const titleText = isEdit ? 'Edit Restaurant' : 'Create New Restaurant'

  return (
    <Modal
      open={isOpenModal}
      handleClose={overlay ? handleCloseModal : undefined}
    >
      <p className="border-b border-b-stone-400 p-2 text-heading-s-regular leading-5">
        {titleText}
      </p>
      <section className="w-big-500 p-4">
        <form onSubmit={handleSubmit((data) => handleSubmitForm(data))}>
          <div className="mb-6">
            <Input
              {...register('name')}
              className="w-52"
              labelText="Restaurant Name:"
              type="text"
              placeholder="ex: Superadmin, etx"
              error={!!errors?.name}
              helperText={errors?.name?.message}
            />
          </div>

          <div className="mb-6">
            <Input
              {...register('email')}
              className="w-52"
              labelText="Restaurant email:"
              type="text"
              placeholder="ex: mail@restaurant.co.id"
              error={!!errors?.email}
              helperText={errors?.email?.message}
            />
          </div>

          <div className="mb-6">
            <Input
              {...register('phone')}
              className="w-52"
              labelText="Restaurant Phone:"
              type="text"
              placeholder="ex: 08123456789"
              error={!!errors?.phone}
              helperText={errors?.phone?.message}
            />
          </div>

          <div className="mb-6">
            <Input
              {...register('address')}
              className="w-52"
              labelText="Restaurant Address:"
              type="text"
              placeholder="ex: Jalan Kenangan, etc"
              error={!!errors?.address}
              helperText={errors?.address?.message}
            />
          </div>

          <div className="mb-6">
            <Input
              {...register('nib')}
              className="w-52"
              labelText="Restaurant NIB:"
              type="text"
              placeholder="ex: -"
              error={!!errors?.nib}
              helperText={errors?.nib?.message}
            />
          </div>

          <div className="mb-6">
            <Input
              {...register('npwp')}
              className="w-52"
              labelText="Restaurant NPWP:"
              type="text"
              placeholder="ex: -"
              error={!!errors?.npwp}
              helperText={errors?.npwp?.message}
            />
          </div>

          <div className="mb-6">
            <Input
              {...register('owner_name')}
              className="w-52"
              labelText="Restaurant Owner Name:"
              type="text"
              placeholder="ex: John Doe"
              error={!!errors?.owner_name}
              helperText={errors?.owner_name?.message}
            />
          </div>

          <div className="mb-6">
            <Input
              {...register('owner_phone')}
              className="w-52"
              labelText="Restaurant Owner Phone:"
              type="text"
              placeholder="ex: 08123456789, etc"
              error={!!errors?.owner_phone}
              helperText={errors?.owner_phone?.message}
            />
          </div>

          <Button
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
    </Modal>
  )
}

export default MoleculesFormRestaurant
