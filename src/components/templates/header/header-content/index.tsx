import { Button } from 'posy-fnb-core'
import React from 'react'
import { AiOutlineUserAdd } from 'react-icons/ai'

interface HeaderContentProps {
  onClick: () => void
}

const HeaderContent = ({ onClick }: HeaderContentProps) => (
  <header className="mb-5">
    <Button
      type="submit"
      variant="primary"
      size="l"
      className="justify flex items-center  gap-2 text-sm"
      onClick={onClick}
    >
      <AiOutlineUserAdd />
      Add New User
    </Button>
  </header>
)

export default HeaderContent
