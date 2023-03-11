import { DeleteRoleResponse } from '../types'
import { useDeleteRoleMutation } from '../sources/DeleteRoleQuery'
import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { DeleteRoleParams } from '@/domain/role/repositories/RoleRepository'

export const useDeleteRoleUsecase = (
  options?: MutationOptions<DeleteRoleResponse>,
): any => {
  const { mutate, data, ...rest } = useDeleteRoleMutation(options)

  const deleteRole = (uuid: DeleteRoleParams) => {
    mutate(uuid)
  }

  return {
    deleteRole,
    data: data?.data.data,
    ...rest,
  }
}
