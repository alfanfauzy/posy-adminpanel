/**
 * User Manage Outlet Form Modal
 */
import React, { useEffect } from 'react'
import { Button, Input, Select } from 'posy-fnb-core'
import { AiOutlineCheckSquare } from 'react-icons/ai'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import { FormManageOutletEntities } from './entities'
import { useForm } from '@/hooks/useForm'
import { ManageOutletFormSchema } from '@/schemas/outlet'

const ModalForm = dynamic(() => import('@/molecules/modal/form'), {
  ssr: false,
})

interface MoleculesFormManageOutletProps {
  isEdit: boolean
  isOpenModal: boolean
  handleClose: () => void
  selectedData: any
}

const MoleculesFormManageOutlet = ({
  isEdit,
  isOpenModal,
  handleClose,
  selectedData,
}: MoleculesFormManageOutletProps) => {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    schema: ManageOutletFormSchema,
    mode: 'onChange',
  })

  const handleCloseModal = () => {
    reset()
    handleClose()
  }

  const handleCreateOutlet = (data: FormManageOutletEntities) => {
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
      toast.success('Sucessfully added new Outlet')
    }
  }

  const handleEditOutlet = (data: FormManageOutletEntities) => {
    /**
     * Todo : Send `data` to backend
     */
    if (data) {
      handleCloseModal()
      toast.success('Sucessfully edit Outlet')
    }
  }

  const handleSubmitForm = (data: FormManageOutletEntities) => {
    if (isEdit) {
      handleEditOutlet(data)
    } else {
      handleCreateOutlet(data)
    }
  }

  useEffect(() => {
    if (isEdit) {
      const { restaurant, outlet, city, address, phone } = selectedData
      setValue('restaurant', restaurant)
      setValue('outlet', outlet)
      setValue('city', city)
      setValue('address', address)
      setValue('phone', phone)
    }
  }, [selectedData, isEdit, setValue])

  const titleText = isEdit ? 'Edit Outlet' : 'Create New Outlet'

  return (
    <ModalForm
      isOpenModal={isOpenModal}
      handleCloseModal={handleCloseModal}
      title={titleText}
    >
      <section className="w-big-500 p-4">
        <form onSubmit={handleSubmit((data) => handleSubmitForm(data))}>
          <div className="mb-6">
            <Select
              name="restaurant"
              onChange={(e) => setValue('restaurant', e)}
              options={[
                { label: 'Role 1', value: 'Role 1' },
                { label: 'Role 2', value: 'Role 2' },
              ]}
              labelText="Restaurant"
              placeholder="ex: Select Restaurant"
              className="flex items-center justify-center"
              error={!!errors.restaurant}
              helperText={errors?.restaurant?.message}
            />
          </div>

          <div className="mb-6">
            <Input
              {...register('outlet')}
              className="w-52"
              labelText="Outlet:"
              type="text"
              placeholder="ex: Outlet"
              error={!!errors?.outlet}
              helperText={errors?.outlet?.message}
            />
          </div>

          <div className="mb-6">
            <Input
              {...register('city')}
              className="w-52"
              labelText="City:"
              type="text"
              placeholder="ex: City"
              error={!!errors?.city}
              helperText={errors?.city?.message}
            />
          </div>

          <div className="mb-6">
            <Input
              {...register('address')}
              className="w-52"
              labelText="Address:"
              type="text"
              placeholder="ex: Address"
              error={!!errors?.address}
              helperText={errors?.address?.message}
            />
          </div>

          <div className="mb-6">
            <Input
              {...register('phone')}
              className="w-52"
              labelText="Phone:"
              type="string"
              placeholder="ex: 081234567890"
              error={!!errors?.phone}
              helperText={errors?.phone?.message}
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
    </ModalForm>
  )
}

export default MoleculesFormManageOutlet
