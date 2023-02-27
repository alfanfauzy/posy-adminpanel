import { Button } from 'posy-fnb-core'
import React, { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { generateUniqueId } from '@/constants/utils'
import Accordion from '@/molecules/addOnAccordion'

const OrganismAddOnForm = () => {
  const [addOn, setAddOn] = useState([])

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

  const [expanded, setExpanded] = useState<false | number>(0)

  return (
    <div className="mb-5">
      <section className="mt-3 mb-3 inline-flex w-full items-baseline justify-end gap-3">
        <Button
          size="xs"
          onClick={(e) => {
            e.preventDefault()
            handleAddNew()
          }}
          className="flex items-center justify-center gap-3 bg-[#00bb9a]"
        >
          <AiOutlinePlus />
          Add AddOn
        </Button>
      </section>

      {addOn.map((i) => (
        <Accordion
          key={i}
          index={i}
          expanded={expanded}
          setExpanded={setExpanded}
        />
      ))}
    </div>
  )
}

export default OrganismAddOnForm
