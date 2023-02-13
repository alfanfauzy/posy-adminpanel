import dynamic from 'next/dynamic'
import { Button } from 'posy-fnb-core'
import React from 'react'

const Modal = dynamic(() => import('posy-fnb-core').then((el) => el.Modal), {
  ssr: false,
})

interface ModalConfirmationProps {
  isOpenModal: boolean
  title?: string | React.ReactElement
  text?: string | React.ReactElement
  textCancel?: string | React.ReactElement
  textOk?: string | React.ReactElement
  onClose: () => void
  onOk: () => void
}

const ModalConfirmation = ({
  isOpenModal,
  title = 'Confirmation',
  text,
  textCancel = 'Cancel',
  textOk = 'Submit',
  onClose,
  onOk,
}: ModalConfirmationProps) => (
  <Modal open={isOpenModal}>
    <article className="h-44 p-3 text-center">
      <p className="text-xl-semibold">{title}</p>
      <span className="flex h-20 items-center justify-center">{text}</span>
      <footer className="absolute bottom-0 right-0 left-0 flex justify-center gap-1 p-3">
        <Button size="m" variant="red-accent" onClick={onClose}>
          {textCancel}
        </Button>
        <Button size="m" onClick={onOk}>
          {textOk}
        </Button>
      </footer>
    </article>
  </Modal>
)

export default ModalConfirmation
