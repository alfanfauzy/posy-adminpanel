/**
 * Category Form Modal
 */
import React from 'react'
import { Button, Input } from 'posy-fnb-core'
import { AiOutlineCheckSquare } from 'react-icons/ai'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import { FormCategoryEntities } from './entities'
import { useForm } from '@/hooks/useForm'
import { categorySchema } from '@/schemas/category'
import useToggle from '@/hooks/useToggle'
import { DataType } from '@/pages/admin/list/entities'
import AtomSwitch from '@/atoms/switch'

const ModalForm = dynamic(() => import('@/molecules/modal/form'), {
  ssr: false,
})

interface MoleculesFormCategoryProps {
  isEdit: boolean
  isOpenModal: boolean
  handleClose: () => void
  selectedData: DataType
}

const MoleculesFormCategory = ({
  isEdit = false,
  isOpenModal,
  handleClose,
}: MoleculesFormCategoryProps) => {
  const { value: iSDisplayToggle, toggle: handleDisplayToggle } =
    useToggle(false)

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    schema: categorySchema,
    mode: 'onChange',
  })

  const handleCloseModal = () => {
    reset()
    handleClose()
  }

  const handleCreateAdmin = (data: FormCategoryEntities) => {
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

  const handleEditAdmin = (data: FormCategoryEntities) => {
    /**
     * Todo : Send `data` to backend
     */
    if (data) {
      handleCloseModal()
      toast.success('Sucessfully edit user admin')
    }
  }

  const handleSubmitForm = (data: FormCategoryEntities) => {
    if (isEdit) {
      handleEditAdmin(data)
    } else {
      handleCreateAdmin(data)
    }
  }

  const titleText = isEdit ? 'Edit User' : 'Create New Category'

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
              {...register('name')}
              className="w-52"
              labelText="Category Name:"
              type="text"
              placeholder="ex: Drink, Food, Baverages"
              disabled={isEdit}
              error={!!errors?.name}
              helperText={errors?.name?.message}
            />
          </div>
          <div className="mb-6">
            <AtomSwitch
              label="Display on Menu"
              text={iSDisplayToggle ? 'Yes' : 'No'}
              onChange={handleDisplayToggle}
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

export default MoleculesFormCategory
