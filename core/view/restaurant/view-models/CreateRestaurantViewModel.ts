import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { CreateRestaurantResponse } from '@/data/restaurant/types'
import { CreateRestaurantRepository } from '@/domain/restaurant/repositories/RestaurantRepository'
import { useCreateRestaurantUsecase } from '@/data/restaurant/usecases/CreateRestaurantUsecases'

export const useCreateRestaurantViewModal = (
  options: MutationOptions<CreateRestaurantResponse>,
): CreateRestaurantRepository => {
  const result = useCreateRestaurantUsecase(options)

  return result
}
