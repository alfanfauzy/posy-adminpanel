/**
 * Admin Form Modal
 */
import React, { useEffect, useMemo } from 'react'
import { Button, Input, Select } from 'posy-fnb-core'
import { AiOutlineCheckSquare } from 'react-icons/ai'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import { FormAdminEntities } from './entities'
import { useForm } from '@/hooks/useForm'
import { AdminFormSchema, EditAdminFormSchema } from '@/schemas/admin'
import useToggle from '@/hooks/useToggle'
import IconEye from '@/atoms/icon/IconEye'
import { useGetRolesViewModal } from '@/view/role/view-modals/GetRolesViewModel'
import { GetRoleListDataResponse } from 'core/data/role/types/index'
import { GetRolesInput } from '@/domain/role/repositories/RoleRepository'
import { useCreateAdminViewModal } from '@/view/admin/view-models/CreateAdminViewModel'
import { Admin } from '@/domain/admin/models'
import { useUpdateAdminViewModal } from '@/view/admin/view-models/UpdateAdminViewModel'

const ModalForm = dynamic(() => import('@/molecules/modal/form'), {
  ssr: false,
})

interface MoleculesFormAdminProps {
  isEdit: boolean
  isOpenModal: boolean
  handleClose: () => void
  selectedData: Admin | Record<string, never>
  handleRefecth: () => void
}

const MoleculesFormAdmin = ({
  isEdit = false,
  isOpenModal,
  handleClose,
  selectedData,
  handleRefecth,
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

  const paramsGetRole: GetRolesInput = {
    search: [],
    sort: { field: 'created_at', value: 'desc' },
    page: 1,
    limit: 0,
  }

  const { data: RolesList, isLoading: isLoadingGetRole } =
    useGetRolesViewModal(paramsGetRole)

  const RoleSelect = useMemo(() => {
    if (!RolesList) return []

    return Object.values(RolesList).map((role: GetRoleListDataResponse) => ({
      label: role.name,
      value: role.uuid,
    }))
  }, [RolesList])

  const handleCloseModal = () => {
    reset()
    handleClose()
    handleRefecth()
  }

  const { createAdmin, isLoading: isLoadingCreate } = useCreateAdminViewModal({
    onSuccess() {
      handleCloseModal()
      toast.success('Sucessfully added new user')
    },
  })

  const { updateAdmin, isLoading: isLoadingUpdate } = useUpdateAdminViewModal({
    onSuccess() {
      handleCloseModal()
      toast.success('Sucessfully update user')
    },
  })

  const handleSubmitForm = (data: FormAdminEntities) => {
    const { uuid } = selectedData

    const {
      email,
      fullname,
      password,
      role_uuid: { value },
    } = data

    const newPayload = {
      id: '0',
      params: { email, fullname, password, role_uuid: value },
    }

    const newPayloadEdit = {
      id: uuid,
      payload: { fullname, role_uuid: value },
    }

    if (isEdit) {
      updateAdmin(newPayloadEdit)
    } else {
      createAdmin(newPayload)
    }
  }

  useEffect(() => {
    if (isEdit) {
      if (RolesList) {
        const { email, fullname, roleid } = selectedData
        setValue('email', email || '')
        setValue('fullname', fullname || '')

        const getRole: GetRoleListDataResponse[] = Object.values(RolesList)
          .map((datafilter) => datafilter)
          .filter((data: GetRoleListDataResponse) => data.uuid === roleid)

        setValue('role_uuid', {
          label: getRole?.[0].name,
          value: getRole?.[0].uuid,
        })
        setValue('password', '')
        setValue('confirmPassword', '')
      }
    }
  }, [selectedData, isEdit, setValue])

  const wordingText = isEdit
    ? { title: 'Edit User', button: 'Save' }
    : { title: 'Create New User', button: 'Submit' }

  return (
    <ModalForm
      handleCloseModal={handleCloseModal}
      isOpenModal={isOpenModal}
      title={wordingText.title}
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
              options={RoleSelect}
              labelText="Role"
              placeholder="ex: Select role"
              className="flex items-center justify-center"
              error={!!errors.role_uuid}
              helperText={errors?.role_uuid?.message}
              isClearable
              isLoading={isLoadingGetRole}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="l"
            fullWidth
            className="flex items-center justify-center gap-2"
            isLoading={isLoadingCreate || isLoadingUpdate}
          >
            <AiOutlineCheckSquare />
            {wordingText.button}
          </Button>
        </form>
      </section>
    </ModalForm>
  )
}

export default MoleculesFormAdmin
