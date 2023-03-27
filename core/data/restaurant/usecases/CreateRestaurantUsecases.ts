import { CreateRestaurantResponse } from '../types'
import { useCreateRestaurantMutation } from '../sources/CreateRestaurantQuery'
import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { FormBodyPayload } from '@/domain/restaurant/models'

export const useCreateRestaurantUsecase = (
  options?: MutationOptions<CreateRestaurantResponse>,
): any => {
  const { mutate, data, ...rest } = useCreateRestaurantMutation(options)

  const createRestaurant = (payload: FormBodyPayload) => {
    mutate(payload)
  }

  return {
    createRestaurant,
    data: data?.data.data,
    ...rest,
  }
}
