import { DeleteSubscriptionResponse } from '../types'
import { useDeleteSubscriptionMutation } from '../sources/DeleteSubscriptionQuery'
import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { DeleteSubscriptionParams } from '@/domain/subscription/repositories/SubscriptionRepository'

export const useDeleteSubscriptionUsecase = (
  options?: MutationOptions<DeleteSubscriptionResponse>,
): any => {
  const { mutate, data, ...rest } = useDeleteSubscriptionMutation(options)

  const deleteSubscription = (payload: DeleteSubscriptionParams) => {
    mutate(payload)
  }

  return {
    deleteSubscription,
    data: data?.data.data,
    ...rest,
  }
}
