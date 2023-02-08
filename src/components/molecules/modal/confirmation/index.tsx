import dynamic from 'next/dynamic'
import { Button } from 'posy-fnb-core'
import React from 'react'

const Modal = dynamic(() => import('posy-fnb-core').then((el) => el.Modal), {
  ssr: false,
})

interface ModalConfirmation {
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
}: ModalConfirmation) => (
  <Modal open={isOpenModal}>
    <article className="h-44 text-center p-3">
      <p className="text-xl-semibold">{title}</p>
      <span className="flex justify-center items-center h-20">{text}</span>
      <footer className="flex p-3 gap-1 justify-center absolute bottom-0 right-0 left-0">
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
