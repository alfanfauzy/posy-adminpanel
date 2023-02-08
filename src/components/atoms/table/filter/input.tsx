import { Input } from 'antd'
import { Button } from 'posy-fnb-core'
import React from 'react'

const FilterInput = ({
  selectedKeys,
  setSelectedKeys,
  handleSearch,
  clearFilters,
  confirm,
  ...props
}: any) => {
  const handleClose = () => {
    setSelectedKeys([])
    clearFilters()
    // confirm({ closeDropdown: true })
  }

  return (
    <section className="p-4">
      <p className="mb-2 text-m-medium">Search : </p>
      <Input
        placeholder="Input search"
        value={selectedKeys[0]}
        onChange={(e) => {
          setSelectedKeys(e.target.value ? [e.target.value] : [])
        }}
        // onBlur={() => {}}
      />
      <span className="mt-3 flex gap-4">
        <Button size="xs" onClick={() => handleSearch(selectedKeys, confirm)}>
          Search
        </Button>
        <Button size="xs" variant="red-accent" onClick={() => handleClose()}>
          Reset
        </Button>
      </span>
    </section>
  )
}

export default FilterInput
