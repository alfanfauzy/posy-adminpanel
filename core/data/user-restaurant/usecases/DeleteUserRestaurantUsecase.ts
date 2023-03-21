import { DeleteUserRestaurantResponse } from '../types'
import { useDeleteUserRestaurantMutation } from '../sources/DeleteUserRestaurantQuery'
import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { DeleteUserRestaurantParams } from '@/domain/user-restaurant/repositories/UserRestaurantRepository'

export const useDeleteUserRestaurantUsecase = (
  options?: MutationOptions<DeleteUserRestaurantResponse>,
): any => {
  const { mutate, data, ...rest } = useDeleteUserRestaurantMutation(options)

  const deleteUserRestaurant = (payload: DeleteUserRestaurantParams) => {
    mutate(payload)
  }

  return {
    deleteUserRestaurant,
    data: data?.data.data,
    ...rest,
  }
}
