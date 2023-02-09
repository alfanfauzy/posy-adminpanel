import { Button } from 'posy-fnb-core'
import React, { ReactNode } from 'react'

interface HeaderContentProps {
  onClick: () => void
  textButton: string
  withIconButton?: boolean
  iconElement?: ReactNode | JSX.Element
}

const HeaderContent = ({
  onClick,
  textButton,
  withIconButton = true,
  iconElement,
}: HeaderContentProps) => (
  <header className="mb-5">
    <Button
      type="submit"
      variant="primary"
      size="l"
      className="justify flex items-center  gap-2 text-sm"
      onClick={onClick}
    >
      {withIconButton && iconElement}
      {textButton}
    </Button>
  </header>
)

export default HeaderContent
