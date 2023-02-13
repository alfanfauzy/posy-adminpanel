import { Modal } from 'posy-fnb-core'
import React from 'react'

interface ModalFormProps {
  isOpenModal: boolean
  handleCloseModal: () => void
  children: React.ReactNode
  title?: string
}

const ModalForm = ({
  isOpenModal,
  handleCloseModal,
  children,
  title,
}: ModalFormProps) => {
  const overlay = true

  return (
    <Modal
      open={isOpenModal}
      handleClose={overlay ? handleCloseModal : undefined}
      showCloseButton
    >
      {title && (
        <p className="absolute top-[0.7rem] p-2 text-heading-s-regular leading-5">
          {title}
        </p>
      )}
      {children}
    </Modal>
  )
}

export default ModalForm
