import { useCreateUserRestaurantMutation } from '../sources/CreateUserRestaurantQuery'
import { CreateUserRestaurantResponse } from '../types'
import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { FormUserRestaurant } from '@/domain/user-restaurant/models'

export const useCreateUserRestaurantUsecase = (
  options?: MutationOptions<CreateUserRestaurantResponse>,
): any => {
  const { mutate, data, ...rest } = useCreateUserRestaurantMutation(options)

  const createUserRestaurant = (payload: FormUserRestaurant) => {
    mutate(payload)
  }

  return {
    createUserRestaurant,
    data: data?.data.data,
    ...rest,
  }
}
