import { UpdateRestaurantResponse } from '../types'
import { useUpdateRestaurantMutation } from '../sources/UpdateRestaurantQuery'
import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { UpdateRestaurantParams } from '@/domain/restaurant/repositories/RestaurantRepository'

export const useUpdateRestaurantUsecase = (
  options?: MutationOptions<UpdateRestaurantResponse>,
): any => {
  const { mutate, data, ...rest } = useUpdateRestaurantMutation(options)

  const updateRestaurant = (params: UpdateRestaurantParams) => {
    mutate(params)
  }

  return {
    updateRestaurant,
    data: data?.data.data,
    ...rest,
  }
}
