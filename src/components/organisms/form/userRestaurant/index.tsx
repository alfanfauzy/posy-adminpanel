/**
 * User Restaurant Form Modal
 */
import React, { useEffect } from 'react'
import { Button, Input, Select } from 'posy-fnb-core'
import { AiOutlineCheckSquare } from 'react-icons/ai'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import { FormUserRestaurantEntities } from './entities'
import { useForm } from '@/hooks/useForm'
import { UserRestauranFormSchema } from '@/schemas/userRestaurant'
import useToggle from '@/hooks/useToggle'
import IconEye from '@/atoms/icon/IconEye'

const Modal = dynamic(() => import('posy-fnb-core').then((el) => el.Modal), {
  ssr: false,
})

interface MoleculesFormUserRestaurantProps {
  isEdit: boolean
  isOpenModal: boolean
  handleClose: () => void
  selectedData: any
}

const MoleculesFormUserRestaurant = ({
  isEdit,
  isOpenModal,
  handleClose,
  selectedData,
}: MoleculesFormUserRestaurantProps) => {
  const { value: showPassword, toggle: handleShowPassword } = useToggle(true)
  const { value: showConfirmPassword, toggle: handleShowConfirmPassword } =
    useToggle(true)

  const overlay = true

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    schema: UserRestauranFormSchema,
    mode: 'onChange',
  })

  const handleCloseModal = () => {
    reset()
    handleClose()
  }

  const handleCreateRestaurant = (data: FormUserRestaurantEntities) => {
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

  const handleEditRestaurant = (data: FormUserRestaurantEntities) => {
    /**
     * Todo : Send `data` to backend
     */
    if (data) {
      handleCloseModal()
      toast.success('Sucessfully edit Restaurant')
    }
  }

  const handleSubmitForm = (data: FormUserRestaurantEntities) => {
    if (isEdit) {
      handleEditRestaurant(data)
    } else {
      handleCreateRestaurant(data)
    }
  }

  useEffect(() => {
    if (isEdit) {
      const { name, email, phone, role, outlet } = selectedData
      setValue('name', name)
      setValue('email', email)
      setValue('phonenumber', phone)
      setValue('role', role)
      setValue('outlet', outlet)
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
              labelText="Full Name:"
              type="text"
              placeholder="ex: John"
              error={!!errors?.name}
              helperText={errors?.name?.message}
            />
          </div>

          <div className="mb-6">
            <Input
              {...register('email')}
              className="w-52"
              labelText="Email:"
              type="text"
              placeholder="ex: mail@restaurant.co.id"
              error={!!errors?.email}
              helperText={errors?.email?.message}
            />
          </div>

          <div className="mb-6">
            <Input
              {...register('phonenumber')}
              className="w-52"
              labelText="Phone Number:"
              type="text"
              placeholder="ex: 08123456789"
              error={!!errors?.phonenumber}
              helperText={errors?.phonenumber?.message}
            />
          </div>

          <div className="mb-6">
            <Select
              name="role"
              onChange={(e) => setValue('role', e)}
              options={[
                { label: 'Role 1', value: 'Role 1' },
                { label: 'Role 2', value: 'Role 2' },
              ]}
              labelText="Role"
              placeholder="ex: Select Role"
              className="flex items-center justify-center"
              error={!!errors.role}
              helperText={errors?.role?.message}
            />
          </div>

          <div className="mb-6">
            <Select
              name="outlet"
              onChange={(e) => setValue('outlet', e)}
              options={[
                { label: 'Outlet 1', value: 'Outlet 1' },
                { label: 'Outlet 2', value: 'Outlet 2' },
              ]}
              labelText="Role"
              placeholder="ex: Select Outlet"
              className="flex items-center justify-center"
              error={!!errors.outlet}
              helperText={errors?.outlet?.message}
            />
          </div>

          <div className="mb-6">
            <Input
              {...register('password')}
              className="w-52"
              labelText="Password:"
              placeholder="ex: -"
              error={!!errors?.password}
              helperText={errors?.password?.message}
              type={showPassword ? 'password' : 'text'}
              endAdornment={
                <IconEye
                  value={showPassword}
                  handlePassword={handleShowPassword}
                />
              }
            />
          </div>

          <div className="mb-6">
            <Input
              {...register('confirmPassword')}
              className="w-52"
              labelText="Confirm Password:"
              placeholder="ex: John Doe"
              error={!!errors?.confirmPassword}
              helperText={errors?.confirmPassword?.message}
              type={showConfirmPassword ? 'password' : 'text'}
              endAdornment={
                <IconEye
                  value={showConfirmPassword}
                  handlePassword={handleShowConfirmPassword}
                />
              }
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

export default MoleculesFormUserRestaurant
