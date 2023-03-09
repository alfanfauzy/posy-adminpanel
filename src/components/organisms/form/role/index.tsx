/**
 * Role Form Modal
 */
import React, { useEffect } from 'react'
import { Button, Input } from 'posy-fnb-core'
import { AiOutlineCheckSquare } from 'react-icons/ai'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import { useForm } from '@/hooks/useForm'
import { RoleFormSchema } from '@/schemas/role'
import { useCreateRolesViewModal } from '@/view/role/view-modals/CreateRoleViewModel'
import { useUpdateRolesViewModal } from '@/view/role/view-modals/UpdateRoleViewModel'
import { Role } from '@/domain/role/models'

const ModalForm = dynamic(() => import('@/molecules/modal/form'), {
  ssr: false,
})
interface MoleculesFormRoleProps {
  isEdit: boolean
  isOpenModal: boolean
  handleClose: () => void
  selectedData: Role
  handleRefecth: () => void
}

const MoleculesFormRole = ({
  isEdit,
  isOpenModal,
  handleClose,
  selectedData,
  handleRefecth,
}: MoleculesFormRoleProps) => {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    schema: RoleFormSchema,
    mode: 'onChange',
  })

  const handleCloseModal = () => {
    reset()
    handleClose()
    handleRefecth()
  }

  const payload = watch()
  const payloadUpdate = { payload, id: selectedData.uuid }

  const { createRole, isLoading } = useCreateRolesViewModal(payload, {
    onSuccess() {
      handleCloseModal()
      toast.success('Sucessfully added new Role')
    },
    onError(error) {
      console.log('Error add role')
    },
  })

  const { updateRole, isLoading: isLoadingUpdate } = useUpdateRolesViewModal(
    payloadUpdate,
    {
      onSuccess() {
        handleCloseModal()
        toast.success('Sucessfully updated Role')
      },
      onError(error) {
        console.log(error)
      },
    },
  )

  const handleSubmitForm = () => {
    if (isEdit) {
      updateRole()
    } else {
      createRole()
    }
  }

  useEffect(() => {
    if (isEdit) {
      const { name, description } = selectedData
      setValue('name', name || '')
      setValue('description', description || '')
    }
  }, [selectedData, isEdit, setValue])

  const titleText = isEdit ? 'Edit Role' : 'Create New Role'

  return (
    <ModalForm
      handleCloseModal={handleCloseModal}
      isOpenModal={isOpenModal}
      title={titleText}
    >
      <section className="w-big-500">
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="mb-6">
            <Input
              {...register('name')}
              className="w-52"
              labelText="Role Name:"
              type="text"
              placeholder="ex: Superadmin, etx"
              error={!!errors?.name}
              helperText={errors?.name?.message}
            />
          </div>

          <div className="mb-6">
            <Input
              {...register('description')}
              labelText="Role Description"
              placeholder="Description of Role"
              className="flex items-center justify-center"
              error={!isEdit && !!errors.description}
              helperText={errors?.description?.message}
            />
          </div>
          {/** Hide for some reason from product */}
          {/* <div className="mb-6">
            <AtomSwitch
              onChange={handleIsAdminValue}
              label="Is Internal"
              name="is_internal"
              value={isAdminValue}
            />
          </div> */}

          <Button
            isLoading={isLoading || isLoadingUpdate}
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

export default MoleculesFormRole
