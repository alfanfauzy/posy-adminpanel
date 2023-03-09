import { UpdateRoleResponse } from '../types'
import { useUpdateRoleMutation } from '../sources/UpdateRoleQuery'
import { MutationOptions } from '@/data/common/types/BaseMutation'
import { UpdateRoleInput } from '@/domain/role/repositories/RoleRepository'

export const useUpdateTransactionUsecase = (
  payload: UpdateRoleInput,
  options?: MutationOptions<UpdateRoleResponse>,
): any => {
  const { mutate, data, ...rest } = useUpdateRoleMutation(payload, options)

  const updateRole = () => {
    mutate({})
  }

  return {
    updateRole,
    data: data?.data.data,
    ...rest,
  }
}
