import MoleculesFormVariant from '../variant'
import { Button, Input } from 'posy-fnb-core'
import React, { useState } from 'react'
import { AiFillDelete, AiOutlinePlus } from 'react-icons/ai'
import AtomSwitch from '@/atoms/switch'
import useToggle from '@/hooks/useToggle'
import { generateUniqueId } from '@/constants/utils'

const initAddOn = {
  addon_name: '',
  is_optional: '',
  can_choose_multiple: '',
  max_variant: '',
  min_variant: '',
  addon_priority: '',
}

const OrganismAddOnForm = () => {
  const [addOn, setAddOn] = useState([])
  const { value: isOptional, toggle: handleIsOptional } = useToggle(false)
  const { value: isCanMultiple, toggle: handleIsCanMultiple } = useToggle(false)

  const handleAddNew = () => {
    const newField = {
      id: generateUniqueId(5),
      addon_name: '',
      is_optional: '',
      can_choose_multiple: '',
      max_variant: '',
      min_variant: '',
      addon_priority: '',
    }

    setAddOn([...addOn, newField])
  }

  return (
    <div>
      <section className="mt-3 inline-flex w-full items-baseline justify-start gap-3">
        <p className="mb-3 text-xl-bold">Add On</p>
        <Button
          size="xs"
          onClick={(e) => {
            e.preventDefault()
            handleAddNew()
          }}
          className="flex items-center justify-center gap-3 bg-[#00bb9a]"
        >
          <AiOutlinePlus />
          Add More AddOn
        </Button>
      </section>

      {addOn.map((data, index) => (
        <div
          className="mb-5 rounded-md border bg-[#cff7f0] p-2 "
          key={generateUniqueId(10)}
        >
          <p className="text-l-bold">Add On {index + 1}</p>
          <Button
            className="absolute right-16"
            variant="red-accent"
            size="m"
            onClick={() => console.log(data.id)}
          >
            <AiFillDelete />
          </Button>
          <div className="flex w-[1000px] justify-between gap-5">
            <div className="flex flex-col">
              <div className="mb-6">
                <Input
                  name="addon_name"
                  labelText="Add On Name:"
                  placeholder="ex: 10, 20"
                  className="flex items-center justify-center"
                />
              </div>
              <div className="mb-6">
                <AtomSwitch
                  label="Add On Active:"
                  onChange={handleIsOptional}
                  text={isOptional ? 'Yes' : 'No'}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="mb-6">
                <Input
                  name="max_variant"
                  labelText="Max Variant:"
                  placeholder="ex: 10, 20"
                  className="flex items-center justify-center"
                />
              </div>
              <div className="mb-6">
                <AtomSwitch
                  label="Can Choose Multitple:"
                  onChange={handleIsCanMultiple}
                  text={isCanMultiple ? 'Yes' : 'No'}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="mb-6">
                <Input
                  name="min_variant"
                  labelText="Min Variant:"
                  placeholder="ex: 10, 20"
                  className="flex items-center justify-center"
                />
              </div>
              <div className="mb-6">
                <Input
                  name="addon_priority"
                  labelText="Add On Priority:"
                  placeholder="ex: 1, 2, 3"
                  className="flex items-center justify-center"
                />
              </div>
            </div>
          </div>
          <MoleculesFormVariant />
        </div>
      ))}
    </div>
  )
}

export default OrganismAddOnForm
