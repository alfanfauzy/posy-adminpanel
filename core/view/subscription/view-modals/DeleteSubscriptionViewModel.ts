import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { DeleteSubscriptionResponse } from '@/data/subscription/types'
import { DeleteSubscriptionRepository } from '@/domain/subscription/repositories/SubscriptionRepository'
import { useDeleteSubscriptionUsecase } from '@/data/subscription/usecases/DeleteSubscriptionUsecase'

export const useDeleteSubscriptionViewModal = (
  options?: MutationOptions<DeleteSubscriptionResponse>,
): DeleteSubscriptionRepository => {
  const result = useDeleteSubscriptionUsecase(options)

  return result
}
