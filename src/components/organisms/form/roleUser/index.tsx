/**
 * Role User Form Modal
 */
import React, { useEffect } from 'react'
import { Button, Input } from 'posy-fnb-core'
import { AiOutlineCheckSquare } from 'react-icons/ai'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import { FormRoleEntities } from './entities'
import { useForm } from '@/hooks/useForm'
import { RoleUserFormSchema } from '@/schemas/roleUser'
import { DataType } from '@/organisms/layout/role/entities'

const Modal = dynamic(() => import('posy-fnb-core').then((el) => el.Modal), {
  ssr: false,
})

interface MoleculesFormRoleUserProps {
  isEdit: boolean
  isOpenModal: boolean
  handleClose: () => void
  selectedData: DataType
}

const MoleculesFormRoleUser = ({
  isEdit,
  isOpenModal,
  handleClose,
  selectedData,
}: MoleculesFormRoleUserProps) => {
  const overlay = true

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    schema: RoleUserFormSchema,
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
    </Modal>
  )
}

export default MoleculesFormRoleUser
