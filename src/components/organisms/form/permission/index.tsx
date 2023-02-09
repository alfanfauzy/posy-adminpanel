/**
 * Permission Form Modal
 */
import React, { useEffect } from 'react'
import { Button, Input } from 'posy-fnb-core'
import { AiOutlineCheckSquare } from 'react-icons/ai'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import { FormPermissionEntities } from './entities'
import { useForm } from '@/hooks/useForm'
import { PermissionFormSchema } from '@/schemas/permission'
import { DataType } from '@/organisms/layout/permission/entities'

const Modal = dynamic(() => import('posy-fnb-core').then((el) => el.Modal), {
  ssr: false,
})

interface MoleculesFormPermissionProps {
  isEdit: boolean
  isOpenModal: boolean
  handleClose: () => void
  selectedData: DataType
}

const MoleculesFormPermission = ({
  isEdit,
  isOpenModal,
  handleClose,
  selectedData,
}: MoleculesFormPermissionProps) => {
  const overlay = true

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    schema: PermissionFormSchema,
    mode: 'onChange',
  })

  const handleCloseModal = () => {
    reset()
    handleClose()
  }

  const handleCreatePermission = (data: FormPermissionEntities) => {
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
      toast.success('Sucessfully added new Permission')
    }
  }

  const handleEditPermission = (data: FormPermissionEntities) => {
    /**
     * Todo : Send `data` to backend
     */
    if (data) {
      handleCloseModal()
      toast.success('Sucessfully edit Permission')
    }
  }

  const handleSubmitForm = (data: FormPermissionEntities) => {
    if (isEdit) {
      handleEditPermission(data)
    } else {
      handleCreatePermission(data)
    }
  }

  useEffect(() => {
    if (isEdit) {
      const { name, description, key } = selectedData
      setValue('name', name || '')
      setValue('description', description || '')
      setValue('key', key || '')
    }
  }, [selectedData, isEdit, setValue])

  const titleText = isEdit ? 'Edit Permission' : 'Create New Permission'

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
              labelText="Permission Name:"
              type="text"
              placeholder="ex: Get All User, Create New User"
              error={!!errors?.name}
              helperText={errors?.name?.message}
            />
          </div>

          <div className="mb-6">
            <Input
              {...register('key')}
              labelText="Permission Key:"
              placeholder="permission key, ex: get_user_list"
              className="flex items-center justify-center"
              error={!isEdit && !!errors.key}
              helperText={errors?.key?.message}
            />
          </div>

          <div className="mb-6">
            <Input
              {...register('description')}
              labelText="Permission Description: "
              placeholder="Description of Permission"
              className="flex items-center justify-center"
              error={!isEdit && !!errors.description}
              helperText={errors?.description?.message}
            />
          </div>

          <div className="mb-6">
            <Input
              {...register('url')}
              labelText="URL: "
              placeholder="url(option)"
              className="flex items-center justify-center"
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

export default MoleculesFormPermission
