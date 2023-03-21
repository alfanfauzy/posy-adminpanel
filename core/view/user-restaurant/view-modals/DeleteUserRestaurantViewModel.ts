import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { DeleteUserRestaurantResponse } from '@/data/user-restaurant/types'
import { DeleteUserRestaurantRepository } from '@/domain/user-restaurant/repositories/UserRestaurantRepository'
import { useDeleteUserRestaurantUsecase } from '@/data/user-restaurant/usecases/DeleteUserRestaurantUsecase'

export const useDeleteUserRestaurantViewModal = (
  options?: MutationOptions<DeleteUserRestaurantResponse>,
): DeleteUserRestaurantRepository => {
  const result = useDeleteUserRestaurantUsecase(options)

  return result
}
