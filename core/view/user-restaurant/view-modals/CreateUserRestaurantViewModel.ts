import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { CreateUserRestaurantRepository } from '@/domain/user-restaurant/repositories/UserRestaurantRepository'
import { useCreateUserRestaurantUsecase } from '@/data/user-restaurant/usecases/CreateUserRestaurantUsecase'
import { CreateUserRestaurantResponse } from '@/data/user-restaurant/types'

export const useCreateUserRestaurantViewModal = (
  options?: MutationOptions<CreateUserRestaurantResponse>,
): CreateUserRestaurantRepository => {
  const result = useCreateUserRestaurantUsecase(options)

  return result
}
