import { Button, Input } from 'posy-fnb-core'
import React, { useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
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
    <div className="border-t-2 border-black p-5 py-2">
      <section className="inline-flex w-full items-baseline justify-start gap-3">
        <p className="mb-3 text-xl-bold">Variant</p>
        <Button
          size="xs"
          onClick={(e) => {
            e.preventDefault()
            handleAddVariant()
          }}
        >
          Add More Variant
        </Button>
      </section>

      {variant.map((data) => (
        <div
          className="flex items-end justify-start gap-3 align-bottom"
          key={generateUniqueId(10)}
        >
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
          <div>
            <Input
              name="variant_priority"
              labelText="Variant Priority:"
              placeholder="ex: 1, 2, 3"
              className="flex items-center justify-center"
            />
          </div>
          <div>
            <Button variant="red-accent" size="m" className="mb-[2px]">
              <AiFillDelete />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MoleculesFormVariant
