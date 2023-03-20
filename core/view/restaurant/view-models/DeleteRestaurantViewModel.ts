import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { DeleteRestaurantResponse } from '@/data/restaurant/types'
import { DeleteRestaurantRepository } from '@/domain/restaurant/repositories/RestaurantRepository'
import { useDeleteRestaurantUsecase } from '@/data/restaurant/usecases/DeleteRestaurantUsecase'

export const useDeleteRestaurantViewModal = (
  options?: MutationOptions<DeleteRestaurantResponse>,
): DeleteRestaurantRepository => {
  const result = useDeleteRestaurantUsecase(options)

  return result
}
