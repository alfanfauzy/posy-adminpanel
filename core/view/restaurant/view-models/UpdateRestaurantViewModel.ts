import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { UpdateRestaurantResponse } from '@/data/restaurant/types'
import { UpdateRestaurantRepository } from '@/domain/restaurant/repositories/RestaurantRepository'
import { useUpdateRestaurantUsecase } from '@/data/restaurant/usecases/UpdateRestaurantUsecase'

export const useUpdateRestaurantViewModal = (
  options?: MutationOptions<UpdateRestaurantResponse>,
): UpdateRestaurantRepository => {
  const result = useUpdateRestaurantUsecase(options)

  return result
}
