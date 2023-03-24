import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { CreateOutletResponse } from '@/data/outlet/type'
import { CreateOutletRepository } from '@/domain/outlet/repositories/OutletRepositories'
import { useCreateOutletUsecase } from '@/data/outlet/usecases/CreateOutletUsecase'

export const useCreateOutletViewModal = (
  options?: MutationOptions<CreateOutletResponse>,
): CreateOutletRepository => {
  const result = useCreateOutletUsecase(options)

  return result
}
