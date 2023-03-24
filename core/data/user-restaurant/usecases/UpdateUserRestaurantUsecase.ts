import { UpdateUserRestaurantResponse } from '../types'
import { useUpdateUserRestaurantMutation } from '../sources/UpdateUserRestaurantQuery'
import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { UpdateUserRestaurantParams } from '@/domain/user-restaurant/repositories/UserRestaurantRepository'

export const useUpdateUserRestaurantUsecase = (
  options?: MutationOptions<UpdateUserRestaurantResponse>,
): any => {
  const { mutate, data, ...rest } = useUpdateUserRestaurantMutation(options)

  const updateUserRestaurant = (payload: UpdateUserRestaurantParams) => {
    mutate(payload)
  }

  return {
    updateUserRestaurant,
    data: data?.data.data,
    ...rest,
  }
}
