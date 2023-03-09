import { MutationOptions } from '@/data/common/types/BaseMutation'
import { CreateRoleResponse } from '@/data/role/types'
import { useCreateTransactionUsecase } from '@/data/role/usecases/CreateRoleUsecase'
import { FormRoleEntities } from '@/organisms/form/role/entities'
import { CreateRoleRepository } from 'core/domain/role/repositories/RoleRepository'

export const useCreateRolesViewModal = (
  payload: FormRoleEntities,
  options?: MutationOptions<CreateRoleResponse>,
): CreateRoleRepository => {
  const result = useCreateTransactionUsecase(payload, options)

  return result
}
