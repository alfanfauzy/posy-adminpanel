import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { UpdateOutletResponse } from '@/data/outlet/type'
import { UpdateOutletRepository } from '@/domain/outlet/repositories/OutletRepositories'
import { useUpdateOutletUsecase } from '@/data/outlet/usecases/UpdateOutletUsecase'

export const useUpdateOutletViewModal = (
  options?: MutationOptions<UpdateOutletResponse>,
): UpdateOutletRepository => {
  const result = useUpdateOutletUsecase(options)

  return result
}
