import { useGetRestaurantUsecase } from '@/data/restaurant/usecases/GetRestaurantUsecase'
import {
  GetFilterRestaurantInput,
  GetRestaurantsResult,
} from '@/domain/restaurant/repositories/RestaurantRepository'

export const useGetRestaurantViewModal = (
  input?: GetFilterRestaurantInput,
): GetRestaurantsResult => {
  const result = useGetRestaurantUsecase(input)

  return result
}
