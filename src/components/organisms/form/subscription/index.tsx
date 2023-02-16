/**
 * Subscription Form Modal
 */
import React from 'react'
import { Button, Input, Select } from 'posy-fnb-core'
import { AiOutlineCheckSquare } from 'react-icons/ai'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import { FormSubscriptionEntities } from './entities'
import { useForm } from '@/hooks/useForm'
import { SubscriptionFormSchema } from '@/schemas/subscription'
import { DataType } from '@/pages/admin/list/entities'
import { Subscription_Period } from '@/constants/index'

const ModalForm = dynamic(() => import('@/molecules/modal/form'), {
  ssr: false,
})

interface MoleculesFormSubscriptionProps {
  isEdit: boolean
  isOpenModal: boolean
  handleClose: () => void
  selectedData: DataType
}

const MoleculesFormSubscription = ({
  isEdit = false,
  isOpenModal,
  handleClose,
  selectedData,
}: MoleculesFormSubscriptionProps) => {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    schema: SubscriptionFormSchema,
    mode: 'onChange',
  })

  const handleCloseModal = () => {
    reset()
    handleClose()
  }

  const handleCreateAdmin = (data: FormSubscriptionEntities) => {
    /**
     * Todo : Send `data` to backend
     */

    /**
     * Will be remove soon
     */

    const getData = JSON.parse(localStorage.getItem('items') || '')

    getData.push(data)

    localStorage.setItem('items', JSON.stringify(getData))

    /** ---------------------------------------------------- */

    if (getData) {
      handleCloseModal()
      toast.success('Sucessfully added new admin')
    }
  }

  const handleEditAdmin = (data: FormSubscriptionEntities) => {
    /**
     * Todo : Send `data` to backend
     */
    if (data) {
      handleCloseModal()
      toast.success('Sucessfully edit user admin')
    }
  }

  const handleSubmitForm = (data: FormSubscriptionEntities) => {
    if (isEdit) {
      handleEditAdmin(data)
    } else {
      handleCreateAdmin(data)
    }
  }

  const titleText = isEdit ? 'Edit User' : 'Register Subscription Plan'

  return (
    <ModalForm
      handleCloseModal={handleCloseModal}
      isOpenModal={isOpenModal}
      title={titleText}
    >
      <section className="w-big-500 p-4">
        <form onSubmit={handleSubmit((data) => handleSubmitForm(data))}>
          <div className="mb-6">
            <Input
              {...register('subscriptionName')}
              className="w-52"
              labelText="Subscription Name"
              type="text"
              placeholder="ex: Package"
              disabled={isEdit}
              error={!!errors?.subscriptionName}
              helperText={errors?.subscriptionName?.message}
            />
          </div>
          <div className="mb-6">
            <Select
              name="subscriptionPeriod"
              onChange={(e) => setValue('subscriptionPeriod', e)}
              options={Subscription_Period}
              labelText="Role"
              placeholder="ex: 1 Month, etc"
              className="flex items-center justify-center"
              error={!!errors.subscriptionPeriod}
              helperText={errors?.subscriptionPeriod?.message}
            />
          </div>
          <div className="mb-6">
            <Input
              {...register('subscriptionPrice')}
              prefix="Rp"
              labelText="Subscription Price"
              placeholder="ex: 1 Month"
              className="flex items-center justify-center"
              error={!!errors.subscriptionPrice}
              helperText={errors?.subscriptionPrice?.message}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="l"
            fullWidth
            className="flex items-center justify-center gap-2"
          >
            <AiOutlineCheckSquare />
            Submit
          </Button>
        </form>
      </section>
    </ModalForm>
  )
}

export default MoleculesFormSubscription
