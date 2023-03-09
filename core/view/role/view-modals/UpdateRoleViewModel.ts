import { MutationOptions } from '@/data/common/types/BaseMutation'
import { UpdateRoleResponse } from '@/data/role/types'
import { useUpdateRoleUsecase } from '@/data/role/usecases/UpdateRoleUsecase'
import {
  UpdateRoleInput,
  UpdateRoleRepository,
} from 'core/domain/role/repositories/RoleRepository'

export const useUpdateRolesViewModal = (
  payload: UpdateRoleInput,
  options?: MutationOptions<UpdateRoleResponse>,
): UpdateRoleRepository => {
  const result = useUpdateRoleUsecase(payload, options)

  return result
}
