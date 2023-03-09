import { DeleteRoleResponse } from '../types'
import { useDeleteRoleMutation } from '../sources/DeleteRoleQuery'
import { MutationOptions } from '@/data/common/types/BaseMutation'

export const useDeleteRoleUsecase = (
  uuid: string,
  options?: MutationOptions<DeleteRoleResponse>,
): any => {
  const { mutate, data, ...rest } = useDeleteRoleMutation(uuid, options)

  const deleteRole = () => {
    mutate({})
  }

  return {
    deleteRole,
    data: data?.data.data,
    ...rest,
  }
}
