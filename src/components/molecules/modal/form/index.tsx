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
}: ModalFormProps) => (
  <Modal
    open={isOpenModal}
    handleClose={handleCloseModal}
    showCloseButton
    overflow
    className="overflow-auto"
    title={title}
  >
    {children}
  </Modal>
)

export default ModalForm
