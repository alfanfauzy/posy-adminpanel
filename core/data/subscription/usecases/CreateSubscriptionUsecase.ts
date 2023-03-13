import { CreateSubscriptionResponse } from '../types'
import { useCreateSubscriptionMutation } from '../sources/CreateSubscriptionQuery'
import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { FormSubscription } from '@/domain/subscription/models'

export const useCreateSubscriptionUsecase = (
  options: MutationOptions<CreateSubscriptionResponse>,
): any => {
  const { mutate, data, ...rest } = useCreateSubscriptionMutation(options)

  const createSubscription = (payload: FormSubscription) => {
    mutate(payload)
  }

  return {
    createSubscription,
    data: data?.data.data,
    ...rest,
  }
}
