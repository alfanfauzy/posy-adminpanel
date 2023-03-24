import { useGetDistrictUsecase } from '@/data/region/usecases/GerDistrictUsecases'
import {
  GetDistrictResult,
  GetFilterDistrictInput,
} from '@/domain/region/repository/RegionRepositories'

export const useGetDistrictViewModal = (
  input?: GetFilterDistrictInput,
): GetDistrictResult => {
  const result = useGetDistrictUsecase(input)

  return result
}
