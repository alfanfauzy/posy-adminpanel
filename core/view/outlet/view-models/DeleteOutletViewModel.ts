import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { DeleteOutletResponse } from '@/data/outlet/type'
import { DeleteOutletRepository } from '@/domain/outlet/repositories/OutletRepositories'
import { useDeleteOutletUsecase } from '@/data/outlet/usecases/DeleteOutletUsecase'

export const useDeleteOutletViewModal = (
  options?: MutationOptions<DeleteOutletResponse>,
): DeleteOutletRepository => {
  const result = useDeleteOutletUsecase(options)

  return result
}
