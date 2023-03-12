import { CreateRoleResponse } from '../types'
import { useCreateRoleMutation } from '../sources/CreateRoleQuery'
import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { FormRoleEntities } from '@/organisms/form/role/entities'

export const useCreateRoleUsecase = (
  options: MutationOptions<CreateRoleResponse>,
): any => {
  const { mutate, data, ...rest } = useCreateRoleMutation(options)

  const createRole = (payload: FormRoleEntities) => {
    mutate(payload)
  }

  return {
    createRole,
    data: data?.data.data,
    ...rest,
  }
}
