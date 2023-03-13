import { useGetAccessQuery } from '../sources/GetAccessQuery'
import { mapToAccessModel } from '../mappers/AccessMapper'
import {
  GetAccessFilterInput,
  GetAccesssResult,
} from '@/domain/access/repositories/AccessRepository'

export const useGetAccessUsecase = (
  input: GetAccessFilterInput,
): GetAccesssResult => {
  const { data, ...rest } = useGetAccessQuery(input)

  if (data?.data.objs) {
    const accessMapper = mapToAccessModel(data.data.objs)

    return {
      data: accessMapper,
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
