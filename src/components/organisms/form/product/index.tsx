import OrganismAddOnForm from '../addon'
import { Button, Input } from 'posy-fnb-core'
import dynamic from 'next/dynamic'
import React from 'react'
import AtomTextArea from '@/atoms/textarea'
import AtomSwitch from '@/atoms/switch'
import useToggle from '@/hooks/useToggle'

const Select = dynamic(
  () => import('posy-fnb-core').then((comp) => comp.Select),
  {
    ssr: false,
  },
)

const OrganismFormProduct = () => {
  const { value: isFavorit, toggle: handleiSFavorit } = useToggle(false)
  const { value: isActive, toggle: handleiSActive } = useToggle(false)

  return (
    <form>
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
        <Input
          name="product_image"
          labelText="Product Image:"
          placeholder="ex: Product Name"
          className="flex items-center justify-center"
        />
      </div>
      <div className="mb-6">
        <AtomSwitch
          label="Product Favorit:"
          onChange={handleiSFavorit}
          text={isFavorit ? 'Yes' : 'No'}
        />
      </div>
      <div className="mb-6">
        <AtomSwitch
          label="Product Active:"
          onChange={handleiSActive}
          text={isActive ? 'Yes' : 'No'}
        />
      </div>
      <div className="mb-6">
        <Input
          name="price"
          labelText="Product Price:"
          placeholder="ex: 10000"
          className="flex items-center justify-center"
        />
      </div>
      <div className="mb-6">
        <Input
          name="price_after_discount"
          labelText="Product Price After Discount:"
          placeholder="ex: 5000"
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
      <OrganismAddOnForm />
      <Button>Submit</Button>
    </form>
  )
}

export default OrganismFormProduct
