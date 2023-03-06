/**
 * Role Form Modal
 */
import React, { useEffect } from 'react'
import { Button, Input } from 'posy-fnb-core'
import { AiOutlineCheckSquare } from 'react-icons/ai'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import { useMutation } from 'react-query'
import { FormRoleEntities } from './entities'
import { useForm } from '@/hooks/useForm'
import { RoleFormSchema } from '@/schemas/role'
import { RoleListData } from 'types/role'
import AtomSwitch from '@/atoms/switch'
import useToggle from '@/hooks/useToggle'
import { AddRoleService, UpdateRoleService } from 'services/role'

const ModalForm = dynamic(() => import('@/molecules/modal/form'), {
  ssr: false,
})
interface MoleculesFormRoleProps {
  isEdit: boolean
  isOpenModal: boolean
  handleClose: () => void
  selectedData: RoleListData
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
    value: isAdminValue,
    setValue: handleValueIsAdmin,
    toggle: handleIsAdminValue,
  } = useToggle(false)

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    schema: RoleFormSchema,
    mode: 'onChange',
  })

  const handleCloseModal = () => {
    reset()
    handleClose()
    handleRefecth()
  }

  const { mutate: handleCreateRole, isLoading } = useMutation(AddRoleService, {
    onSuccess() {
      handleCloseModal()
      toast.success('Sucessfully added new Role')
    },
    onError(error) {
      console.log(error)
    },
  })

  const { mutate: handleEditRole, isLoading: isLoadingEdit } = useMutation(
    UpdateRoleService,
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

  const handleSubmitRole = (payload: FormRoleEntities) => {
    handleCreateRole(payload)
  }

  const handleSubmitEditRole = (payload: FormRoleEntities) => {
    const { uuid } = selectedData
    handleEditRole({ uuid, payload })
  }

  const handleSubmitForm = (data: FormRoleEntities) => {
    if (isEdit) {
      handleSubmitEditRole(data)
    } else {
      handleSubmitRole(data)
    }
  }

  useEffect(() => {
    if (isEdit) {
      const { name, description, is_internal } = selectedData
      setValue('name', name || '')
      setValue('description', description || '')
      setValue('is_internal', is_internal)

      handleValueIsAdmin(is_internal)
    }
  }, [selectedData, isEdit, setValue])

  useEffect(() => {
    setValue('is_internal', isAdminValue)
  }, [isAdminValue])

  const titleText = isEdit ? 'Edit Role' : 'Create New Role'

  return (
    <ModalForm
      handleCloseModal={handleCloseModal}
      isOpenModal={isOpenModal}
      title={titleText}
    >
      <section className="w-big-500">
        <form onSubmit={handleSubmit((data) => handleSubmitForm(data))}>
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
            isLoading={isLoading || isLoadingEdit}
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
