import { useGetCityUsecase } from '@/data/region/usecases/GerCityUsecases'
import {
  GetCityResult,
  GetFilterCityInput,
} from '@/domain/region/repository/RegionRepositories'

export const useGetCityViewModal = (
  input?: GetFilterCityInput,
): GetCityResult => {
  const result = useGetCityUsecase(input)

  return result
}
