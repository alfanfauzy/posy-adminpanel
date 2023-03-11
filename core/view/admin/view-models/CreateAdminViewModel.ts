import { CreateAdminResponse } from '@/data/admin/types'
import { useCreateAdminUsecase } from '@/data/admin/usecases/CreateAdminUsecase'
import { MutationOptions } from '@/data/common/types/BaseMutation'
import { CreateAdminRepository } from '@/domain/admin/repositories/AdminRepository'

export const useCreateAdminViewModal = (
  options?: MutationOptions<CreateAdminResponse>,
): CreateAdminRepository => {
  const result = useCreateAdminUsecase(options)

  return result
}
