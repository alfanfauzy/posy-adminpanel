import { mapToAdminModel } from '../mappers/AdminMapper'
import { useGetAdminQuery } from '../sources/CreateAdminQuery'
import {
  GetAdminsResult,
  GetFilterAdminInput,
} from '@/domain/admin/repositories/AdminRepository'

export const useGetAdminUsecase = (
  input?: GetFilterAdminInput,
): GetAdminsResult => {
  const { data, ...rest } = useGetAdminQuery(input)

  if (data?.data.objs) {
    const adminMapper = mapToAdminModel(data.data.objs)

    return {
      data: adminMapper,
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
