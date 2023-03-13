import { UpdateSubscriptionResponse } from '../types'
import { useUpdateSubscriptionMutation } from '../sources/UpdateSubscriptionQuery'
import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { UpdateSubscriptionParams } from '@/domain/subscription/repositories/SubscriptionRepository'

export const useUpdateSubscriptionUsecase = (
  options?: MutationOptions<UpdateSubscriptionResponse>,
): any => {
  const { mutate, data, ...rest } = useUpdateSubscriptionMutation(options)

  const updateSubscription = (payload: UpdateSubscriptionParams) => {
    mutate(payload)
  }

  return {
    updateSubscription,
    data: data?.data.data,
    ...rest,
  }
}
