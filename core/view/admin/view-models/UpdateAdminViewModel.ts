import { UpdateAdminResponse } from '@/data/admin/types'
import { useUpdateAdminUsecase } from '@/data/admin/usecases/UpdateAdminUsecase'
import { MutationOptions } from '@/data/common/types/BaseMutation'
import { UpdateAdminRepository } from '@/domain/admin/repositories/AdminRepository'

export const useUpdateAdminViewModal = (
  options?: MutationOptions<UpdateAdminResponse>,
): UpdateAdminRepository => {
  const result = useUpdateAdminUsecase(options)

  return result
}
