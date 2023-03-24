import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { UpdateUserRestaurantResponse } from '@/data/user-restaurant/types'
import { UpdateUserRestaurantRepository } from '@/domain/user-restaurant/repositories/UserRestaurantRepository'
import { useUpdateUserRestaurantUsecase } from '@/data/user-restaurant/usecases/UpdateUserRestaurantUsecase'

export const useUpdateUserRestaurantViewModal = (
  options?: MutationOptions<UpdateUserRestaurantResponse>,
): UpdateUserRestaurantRepository => {
  const result = useUpdateUserRestaurantUsecase(options)

  return result
}
