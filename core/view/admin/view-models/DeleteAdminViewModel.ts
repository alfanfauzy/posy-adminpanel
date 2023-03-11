import { DeleteAdminResponse } from '@/data/admin/types'
import { useDeleteAdminUsecase } from '@/data/admin/usecases/DeleteAdminUsecase'
import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { DeleteAdminRepository } from '@/domain/admin/repositories/AdminRepository'

export const useDeleteAdminViewModal = (
  options?: MutationOptions<DeleteAdminResponse>,
): DeleteAdminRepository => {
  const result = useDeleteAdminUsecase(options)

  return result
}
