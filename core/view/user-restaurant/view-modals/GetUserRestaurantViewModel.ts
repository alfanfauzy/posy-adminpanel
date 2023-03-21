import { useGetUserRestaurantUsecase } from '@/data/user-restaurant/usecases/GetUserRestaurantUsecase'
import {
  GetUserRestaurantFilterInput,
  GetUserRestaurantsResult,
} from '@/domain/user-restaurant/repositories/UserRestaurantRepository'

export const useGetUserRestaurantViewModal = (
  input?: GetUserRestaurantFilterInput,
): GetUserRestaurantsResult => {
  const result = useGetUserRestaurantUsecase(input)

  return result
}
