import { MutationOptions } from '@/data/common/types/BaseMutation'
import { DeleteRoleResponse } from '@/data/role/types'
import { useDeleteRoleUsecase } from '@/data/role/usecases/DeleteRoleUsecase'
import { DeleteRoleRepository } from 'core/domain/role/repositories/RoleRepository'

export const useDeleteRolesViewModal = (
  options?: MutationOptions<DeleteRoleResponse>,
): DeleteRoleRepository => {
  const result = useDeleteRoleUsecase(options)

  return result
}
