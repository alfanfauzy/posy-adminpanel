import { mapToOutletModel } from '../mappers/OutletMapper'
import { useGetOutletQuery } from '../sources/GetOutletQuery'
import {
  GetFilterOutletInput,
  GetOutletsResult,
} from '@/domain/outlet/repositories/OutletRepositories'

export const useGetOutletUsecase = (
  input?: GetFilterOutletInput,
): GetOutletsResult => {
  const { data, ...rest } = useGetOutletQuery(input)

  if (data?.data.objs) {
    const outletMapper = mapToOutletModel(data.data.objs)

    return {
      data: outletMapper,
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
