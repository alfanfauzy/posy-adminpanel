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
import { DataType } from '@/organisms/layout/role/entities'
import AtomSwitch from '@/atoms/switch'
import useToggle from '@/hooks/useToggle'
import { AddRoleService } from 'services/role'

const ModalForm = dynamic(() => import('@/molecules/modal/form'), {
  ssr: false,
})

interface MoleculesFormRoleProps {
  isEdit: boolean
  isOpenModal: boolean
  handleClose: () => void
  selectedData: DataType
  handleRefecth: () => void
}

const MoleculesFormRole = ({
  isEdit,
  isOpenModal,
  handleClose,
  selectedData,
  handleRefecth,
}: MoleculesFormRoleProps) => {
  const { value: isAdminValue, toggle: handleIsAdminValue } = useToggle(false)

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

  const handleSubmitRole = (payload: FormRoleEntities) => {
    handleCreateRole(payload)
  }

  const handleEditRole = (data: FormRoleEntities) => {
    /**
     * Todo : Send `data` to backend
     */
    if (data) {
      handleCloseModal()
      toast.success('Sucessfully edit user Role')
    }
  }

  const handleSubmitForm = (data: FormRoleEntities) => {
    if (isEdit) {
      handleEditRole(data)
    } else {
      handleSubmitRole(data)
    }
  }

  useEffect(() => {
    if (isEdit) {
      const { name, description } = selectedData
      setValue('name', name || '')
      setValue('description', description || '')
    }
  }, [selectedData, isEdit, setValue])

  useEffect(() => {
    setValue('is_admin', isAdminValue)
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
          <div className="mb-6">
            <AtomSwitch onChange={handleIsAdminValue} label="Is Admin" />
          </div>

          <Button
            isLoading={isLoading}
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
