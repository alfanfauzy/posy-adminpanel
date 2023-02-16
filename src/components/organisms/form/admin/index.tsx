/**
 * Admin Form Modal
 */
import React, { useEffect } from 'react'
import { Button, Input, Select } from 'posy-fnb-core'
import { AiOutlineCheckSquare } from 'react-icons/ai'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import { FormAdminEntities } from './entities'
import { useForm } from '@/hooks/useForm'
import { AdminFormSchema, EditAdminFormSchema } from '@/schemas/admin'
import useToggle from '@/hooks/useToggle'
import { DataType } from '@/pages/admin/list/entities'
import IconEye from '@/atoms/icon/IconEye'

const ModalForm = dynamic(() => import('@/molecules/modal/form'), {
  ssr: false,
})

interface MoleculesFormAdminProps {
  isEdit: boolean
  isOpenModal: boolean
  handleClose: () => void
  selectedData: DataType
}

const MoleculesFormAdmin = ({
  isEdit = false,
  isOpenModal,
  handleClose,
  selectedData,
}: MoleculesFormAdminProps) => {
  const { value: showPassword, toggle: handleShowPassword } = useToggle(true)
  const { value: showConfirmPassword, toggle: handleShowConfirmPassword } =
    useToggle(true)

  const FormSchema = isEdit ? EditAdminFormSchema : AdminFormSchema

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

  const handleCloseModal = () => {
    reset()
    handleClose()
  }

  const handleCreateAdmin = (data: FormAdminEntities) => {
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
      toast.success('Sucessfully added new admin')
    }
  }

  const handleEditAdmin = (data: FormAdminEntities) => {
    /**
     * Todo : Send `data` to backend
     */
    if (data) {
      handleCloseModal()
      toast.success('Sucessfully edit user admin')
    }
  }

  const handleSubmitForm = (data: FormAdminEntities) => {
    if (isEdit) {
      handleEditAdmin(data)
    } else {
      handleCreateAdmin(data)
    }
  }

  useEffect(() => {
    if (isEdit) {
      const { username, fullname, role } = selectedData
      setValue('email', username || '')
      setValue('fullname', fullname || '')
      setValue('role_uuid', {
        label: role?.[0].name || '',
        value: role?.[0].name || '',
      })
      setValue('password', '')
      setValue('confirmPassword', '')
    }
  }, [selectedData, isEdit, setValue])

  const titleText = isEdit ? 'Edit User' : 'Create New User'

  return (
    <ModalForm
      handleCloseModal={handleCloseModal}
      isOpenModal={isOpenModal}
      title={titleText}
    >
      <section className="w-big-500 p-4">
        <form onSubmit={handleSubmit((data) => handleSubmitForm(data))}>
          <div className="mb-6">
            <Input
              {...register('email')}
              className="w-52"
              labelText="Username (Email)"
              type="text"
              placeholder="ex: user@pvg.co.id"
              disabled={isEdit}
              error={!!errors?.email}
              helperText={errors?.email?.message}
            />
          </div>
          {!isEdit && (
            <>
              <div className="mb-6">
                <Input
                  {...register('password')}
                  labelText="Password"
                  placeholder="Input your password"
                  className="flex items-center justify-center"
                  type={showPassword ? 'password' : 'text'}
                  endAdornment={
                    <IconEye
                      value={showPassword}
                      handlePassword={handleShowPassword}
                    />
                  }
                  error={!isEdit && !!errors?.password}
                  helperText={errors?.password?.message}
                />
              </div>
              <div className="mb-6">
                <Input
                  {...register('confirmPassword')}
                  labelText="Confirm Password"
                  placeholder="Input your confirm password"
                  className="flex items-center justify-center"
                  type={showConfirmPassword ? 'password' : 'text'}
                  endAdornment={
                    <IconEye
                      value={showConfirmPassword}
                      handlePassword={handleShowConfirmPassword}
                    />
                  }
                  error={!!errors.confirmPassword}
                  helperText={errors?.confirmPassword?.message}
                />
              </div>
            </>
          )}
          <div className="mb-6">
            <Input
              {...register('fullname')}
              labelText="Fullname"
              placeholder="ex: John Doe"
              className="flex items-center justify-center"
              error={!!errors.fullname}
              helperText={errors?.fullname?.message}
            />
          </div>
          <div className="mb-6">
            <Select
              name="role_uuid"
              onChange={(e) => setValue('role_uuid', e)}
              value={watch('role_uuid')}
              options={[
                { label: 'Role 1', value: 'Role 1' },
                { label: 'Role 2', value: 'Role 2' },
              ]}
              labelText="Role"
              placeholder="ex: John Doe"
              className="flex items-center justify-center"
              error={!!errors.role_uuid}
              helperText={errors?.role_uuid?.message}
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

export default MoleculesFormAdmin
