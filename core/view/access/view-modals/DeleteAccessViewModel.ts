import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { DeleteAccessResponse } from '@/data/access/types'
import { DeleteAccessRepository } from '@/domain/access/repositories/AccessRepository'
import { useDeleteAccessUsecase } from '@/data/access/usecases/DeleteAccessUsecase'

export const useDeleteAccessViewModal = (
  options?: MutationOptions<DeleteAccessResponse>,
): DeleteAccessRepository => {
  const result = useDeleteAccessUsecase(options)

  return result
}
