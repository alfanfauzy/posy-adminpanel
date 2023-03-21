/**
 * Subscription Form Modal
 */
import React, { useEffect } from 'react'
import { Button, Input, Select } from 'posy-fnb-core'
import { AiOutlineCheckSquare } from 'react-icons/ai'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import { FormSubscriptionEntities } from './entities'
import { useForm } from '@/hooks/useForm'
import { SubscriptionFormSchema } from '@/schemas/subscription'
import { Subscription_Period } from '@/constants/index'
import { useCreateSubscriptionViewModal } from '@/view/subscription/view-modals/CreateSubscriptionViewModel'
import { Subscription } from '@/domain/subscription/models'
import { useUpdateSubscriptionViewModal } from '@/view/subscription/view-modals/UpdateSubscriptionViewModel'
import { formatCurrencyTextInput } from '@/constants/utils'

const ModalForm = dynamic(() => import('@/molecules/modal/form'), {
  ssr: false,
})

interface MoleculesFormSubscriptionProps {
  isEdit: boolean
  isOpenModal: boolean
  handleClose: () => void
  selectedData: Subscription
  handleRefetch: () => void
}

const MoleculesFormSubscription = ({
  isEdit = false,
  isOpenModal,
  handleClose,
  selectedData,
  handleRefetch,
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
    handleRefetch()
  }

  const { createSubscription, isLoading: isLoadingCreate } =
    useCreateSubscriptionViewModal({
      onSuccess() {
        handleCloseModal()
        toast.success('Sucessfully added new Subscription Plan')
      },
    })

  const { updateSubscription, isLoading: isLoadingUpdate } =
    useUpdateSubscriptionViewModal({
      onSuccess() {
        handleCloseModal()
        toast.success('Sucessfully added new Subscription Plan')
      },
    })

  const handleSubmitForm = (data: FormSubscriptionEntities) => {
    const { uuid } = selectedData
    const { subscription_name, description, period, price } = data

    const newPayload = {
      subscription_name,
      description,
      price: Number(price),
      period: period.value,
    }

    const newUpdatePayload = {
      id: uuid,
      payload: {
        subscription_name,
        description,
        price: Number(price),
        period: period.value,
      },
    }

    if (isEdit) {
      updateSubscription(newUpdatePayload)
    } else {
      createSubscription(newPayload)
    }
  }

  useEffect(() => {
    if (isEdit) {
      const { name, price, period, description } = selectedData

      setValue('subscription_name', name)
      setValue('price', price.toString())
      setValue('description', description)

      const getPeriod = Object.values(Subscription_Period).filter(
        (data) => data.value === period,
      )

      setValue('period', getPeriod[0])
    }
  }, [selectedData, isEdit, setValue])

  const wordingText = isEdit
    ? { title: 'Edit Subscription Plan', button: 'Save' }
    : { title: 'Create New Subscription Plan', button: 'Submit' }

  return (
    <ModalForm
      handleCloseModal={handleCloseModal}
      isOpenModal={isOpenModal}
      title={wordingText.title}
    >
      <section className="w-big-500 p-4">
        <form onSubmit={handleSubmit((data) => handleSubmitForm(data))}>
          <div className="mb-6">
            <Input
              {...register('subscription_name')}
              className="w-52"
              labelText="Subscription Name"
              type="text"
              placeholder="ex: Subscription Package Name"
              error={!!errors?.subscription_name}
              helperText={errors?.subscription_name?.message}
            />
          </div>
          <div className="mb-6">
            <Select
              name="period"
              onChange={(e) => setValue('period', e)}
              value={watch('period')}
              options={Subscription_Period}
              labelText="Subscription Period"
              placeholder="ex: 1 Month, etc"
              className="flex items-center justify-center"
              error={!!errors.period}
              helperText={errors?.period?.message}
            />
          </div>
          <div className="mb-6">
            <Input
              {...register('price', {
                setValueAs: (v) => formatCurrencyTextInput(v.replace(/\D/, '')),
              })}
              value={watch('price')}
              labelText="Subscription Price"
              placeholder="ex: 1000, input number only"
              className="flex items-center justify-center"
              error={!!errors.price}
              helperText={errors?.price?.message}
            />
          </div>
          <div className="mb-6">
            <Input
              {...register('description')}
              prefix="Rp"
              labelText="Subscription Description"
              placeholder="ex: Description . . ."
              className="flex items-center justify-center"
              error={!!errors.description}
              helperText={errors?.description?.message}
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            size="l"
            fullWidth
            className="flex items-center justify-center gap-2"
            isLoading={isLoadingCreate || isLoadingUpdate}
          >
            <AiOutlineCheckSquare />
            {wordingText.button}
          </Button>
        </form>
      </section>
    </ModalForm>
  )
}

export default MoleculesFormSubscription
