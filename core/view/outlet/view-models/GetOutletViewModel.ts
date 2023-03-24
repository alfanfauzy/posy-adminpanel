import { useGetOutletUsecase } from '@/data/outlet/usecases/GetOutletUsecases'
import {
  GetFilterOutletInput,
  GetOutletsResult,
} from '@/domain/outlet/repositories/OutletRepositories'

export const useGetOutletViewModal = (
  input?: GetFilterOutletInput,
): GetOutletsResult => {
  const result = useGetOutletUsecase(input)

  return result
}
