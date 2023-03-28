import { Button, Input } from 'posy-fnb-core'
import React, { useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { generateUniqueId } from '@/constants/utils'

const MoleculesFormVariant = () => {
  const [variant, setVariant] = useState([
    {
      variant_name: '',
      variant_price: '',
      variant_priority: '',
    },
  ])

  const handleAddVariant = () => {
    const newVariant = {
      variant_name: '',
      variant_price: '',
      variant_priority: '',
    }

    setVariant([...variant, newVariant])
  }

  return (
    <div className="">
      <section className="inline-flex w-full items-baseline justify-between gap-3">
        <p className="mb-3 text-m-bold">Variant</p>
        <Button
          size="xs"
          onClick={(e) => {
            e.preventDefault()
            handleAddVariant()
          }}
        >
          Add Variant
        </Button>
      </section>

      {variant.map(() => (
        <div
          className="mb-3 flex items-center justify-start gap-3 align-bottom"
          key={generateUniqueId(10)}
        >
          <span className="rounded-full border bg-red-500 p-2 text-l-medium text-white">
            <AiOutlineDelete />
          </span>
          <div>
            <Input
              name="variant_name"
              labelText="Variant Name:"
              placeholder="ex: 10, 20"
              className="flex items-center justify-center"
            />
          </div>
          <div>
            <Input
              name="variant_price"
              labelText="Variant Price:"
              placeholder="ex: 10, 20"
              className="flex items-center justify-center"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default MoleculesFormVariant
