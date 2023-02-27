/**
 * Modal Form Product
 */
import OrganismAddOnForm from '../addon'
import { Button, Input } from 'posy-fnb-core'
import dynamic from 'next/dynamic'
import React from 'react'
import AtomTextArea from '@/atoms/textarea'
import AtomSwitch from '@/atoms/switch'
import useToggle from '@/hooks/useToggle'
import HRLine from '@/atoms/horizontalLine'
import AtomUploadFile from '@/atoms/uploadFile'
import { useForm } from '@/hooks/useForm'
import { RestaurantFormSchema } from '@/schemas/restaurant'

const Select = dynamic(
  () => import('posy-fnb-core').then((comp) => comp.Select),
  {
    ssr: false,
  },
)

const ModalForm = dynamic(() => import('@/molecules/modal/form'), {
  ssr: false,
})

interface MoleculesFormProductProps {
  isEdit: boolean
  isOpenModal: boolean
  handleClose: () => void
  selectedData: any
}

const OrganismFormProduct = ({
  isEdit,
  isOpenModal,
  handleClose,
  selectedData,
}: MoleculesFormProductProps) => {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    schema: RestaurantFormSchema,
    mode: 'onChange',
  })

  const { value: isFavorit, toggle: handleiSFavorit } = useToggle(false)
  const { value: isActive, toggle: handleiSActive } = useToggle(false)

  const handleCloseModal = () => {
    handleClose()
  }

  const titleText = isEdit ? 'Edit Product Menu' : 'Add New Product Menu'

  return (
    <ModalForm
      isOpenModal={isOpenModal}
      handleCloseModal={handleCloseModal}
      title={titleText}
    >
      <section className="w-big-500 p-4">
        <form>
          <div className="mb-6">
            <Select
              name="category_uuids"
              labelText="Choose Outlet:"
              options={[
                { label: 'Outlet 1', value: 'Outlet 1' },
                { label: 'Outlet 2', value: 'Outlet 2' },
              ]}
              placeholder="Select Category"
              className="flex items-center justify-center"
              isMulti
            />
          </div>

          {/** Product Form Section */}
          <HRLine text="Product" />

          <div className="mb-6">
            <AtomUploadFile labelText="Product Image" name="product_image" />
          </div>
          <div className="mb-6">
            <Input
              name="product_name"
              labelText="Product Name:"
              placeholder="ex: Product Name"
              className="flex items-center justify-center"
            />
          </div>
          <div className="mb-6">
            <AtomTextArea
              name="product_description"
              labelText="Product Description:"
              placeholder="ex: Product Description"
              className="flex items-center justify-center"
            />
          </div>

          <div className="mb-6">
            <Select
              name="category_uuids"
              labelText="Category:"
              options={[
                { label: 'Category 1', value: 'Category 1' },
                { label: 'Category 2', value: 'Category 3' },
              ]}
              placeholder="Select Category"
              className="flex items-center justify-center"
            />
          </div>
          <div className="mb-6">
            <Input
              name="cooking_duration"
              labelText="Cooking Duration:"
              placeholder="ex: 10, 20"
              className="flex items-center justify-center"
            />
          </div>

          {/** Price Form Section */}
          <HRLine text="Price" />

          <div className="mb-6">
            <Input
              name="price"
              labelText="Price:"
              placeholder="ex: 10000"
              className="flex items-center justify-center"
            />
          </div>
          <div className="mb-6">
            <Input
              name="price_after_discount"
              labelText="Price After Discount:"
              placeholder="ex: 5000"
              className="flex items-center justify-center"
            />
          </div>
          <div className="mb-6">
            <Input
              name="price_after_discount"
              labelText="Discount Percentage:"
              placeholder="ex: 5000"
              className="flex items-center justify-center"
            />
          </div>
          <div className="mb-6">
            <p className="mb-1 block text-m-regular">Discount:</p>
          </div>

          {/** Addon Form Section */}
          <HRLine text="Addon" />
          <OrganismAddOnForm />
          <Button>Submit</Button>
        </form>
      </section>
    </ModalForm>
  )
}

export default OrganismFormProduct
