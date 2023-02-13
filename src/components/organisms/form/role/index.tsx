/**
 * Role Form Modal
 */
import React, { useEffect } from 'react'
import { Button, Input } from 'posy-fnb-core'
import { AiOutlineCheckSquare } from 'react-icons/ai'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import { FormRoleEntities } from './entities'
import { useForm } from '@/hooks/useForm'
import { RoleFormSchema } from '@/schemas/role'
import { DataType } from '@/organisms/layout/role/entities'

const ModalForm = dynamic(() => import('@/molecules/modal/form'), {
  ssr: false,
})

interface MoleculesFormRoleProps {
  isEdit: boolean
  isOpenModal: boolean
  handleClose: () => void
  selectedData: DataType
}

const MoleculesFormRole = ({
  isEdit,
  isOpenModal,
  handleClose,
  selectedData,
}: MoleculesFormRoleProps) => {
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
  }

  const handleCreateRole = (data: FormRoleEntities) => {
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
      toast.success('Sucessfully added new Role')
    }
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
      handleCreateRole(data)
    }
  }

  useEffect(() => {
    if (isEdit) {
      const { name, description } = selectedData
      setValue('role', name || '')
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
      <section className="w-big-500 p-4">
        <form onSubmit={handleSubmit((data) => handleSubmitForm(data))}>
          <div className="mb-6">
            <Input
              {...register('role')}
              className="w-52"
              labelText="Role Name:"
              type="text"
              placeholder="ex: Superadmin, etx"
              error={!!errors?.role}
              helperText={errors?.role?.message}
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

export default MoleculesFormRole
