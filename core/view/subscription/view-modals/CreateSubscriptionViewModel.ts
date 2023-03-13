import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { CreateSubscriptionResponse } from '@/data/subscription/types'
import { CreateSubscriptionRepository } from '@/domain/subscription/repositories/SubscriptionRepository'
import { useCreateSubscriptionUsecase } from '@/data/subscription/usecases/CreateSubscriptionUsecase'

export const useCreateSubscriptionViewModal = (
  options: MutationOptions<CreateSubscriptionResponse>,
): CreateSubscriptionRepository => {
  const result = useCreateSubscriptionUsecase(options)

  return result
}
