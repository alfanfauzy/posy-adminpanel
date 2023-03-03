import { useQuery } from 'react-query'
import { GetRoleService } from 'services/role'
import { Params } from 'shared/baseResponse'

interface QueryGetRolesProps {
  queryKey: string
  params: Params
  config?: any
}

const useQueryGetRoles = ({ queryKey, params, config }: QueryGetRolesProps) =>
  useQuery([queryKey, { ...params }], async () => GetRoleService(params), {
    select: (data) => data.data,
    ...config,
  })

export { useQueryGetRoles }
