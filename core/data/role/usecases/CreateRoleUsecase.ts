import { CreateRoleResponse } from '../types'
import { useCreateRoleMutation } from '../sources/CreateRoleQuery'
import { MutationOptions } from '@/data/common/types/BaseMutation'
import { CreateRoleRepository } from '@/domain/role/repositories/RoleRepository'
import { FormRoleEntities } from '@/organisms/form/role/entities'

export const useCreateTransactionUsecase = (
  payload: FormRoleEntities,
  options?: MutationOptions<CreateRoleResponse>,
): any => {
  const { mutate, data, ...rest } = useCreateRoleMutation(payload, options)

  const createRole = () => {
    mutate({})
  }

  return {
    createRole,
    data: data?.data.data,
    ...rest,
  }
}
