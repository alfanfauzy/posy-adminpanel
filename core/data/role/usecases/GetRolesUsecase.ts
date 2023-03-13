import { useGetRolesQuery } from '../sources/GetRoleQuery'
import { mapToRoleModel } from '../../subscription/mappers/mappers/RoleMapper'
import {
  GetRolesInput,
  GetRolesResult,
} from 'core/domain/role/repositories/RoleRepository'

export const useGetRolesUsecase = (input?: GetRolesInput): GetRolesResult => {
  const { data, ...rest } = useGetRolesQuery(input)

  if (data?.data.objs) {
    const roleMapper = mapToRoleModel(data.data.objs)

    return {
      data: roleMapper,
      pagination: {
        curr_page: data.data.curr_page,
        per_page: data.data.per_page,
        total_objs: data.data.total_objs,
        total_page: data.data.total_page,
      },
      ...rest,
    }
  }

  return {
    data: undefined,
    pagination: undefined,
    ...rest,
  }
}
