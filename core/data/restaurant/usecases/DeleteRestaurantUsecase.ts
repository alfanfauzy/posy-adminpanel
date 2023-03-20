import { DeleteRestaurantResponse } from '../types'
import { useDeleteRestaurantMutation } from '../sources/DeleteRestaurantQuery'
import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { DeleteRestaurantInput } from '@/domain/restaurant/repositories/RestaurantRepository'

export const useDeleteRestaurantUsecase = (
  options?: MutationOptions<DeleteRestaurantResponse>,
): any => {
  const { mutate, data, ...rest } = useDeleteRestaurantMutation(options)

  const deleteRestaurant = (payload: DeleteRestaurantInput) => {
    mutate(payload)
  }

  return {
    deleteRestaurant,
    data: data?.data.data,
    ...rest,
  }
}
