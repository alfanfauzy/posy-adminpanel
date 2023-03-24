import { mapToDistrictModel } from '../mappers/RegionMapper'
import { useGetDistricesQuery } from '../sources/GetDistrictQuery'
import {
  GetDistrictResult,
  GetFilterDistrictInput,
} from '@/domain/region/repository/RegionRepositories'

export const useGetDistrictUsecase = (
  input?: GetFilterDistrictInput,
): GetDistrictResult => {
  const { data, ...rest } = useGetDistricesQuery(input)

  if (data?.data.objs) {
    const districtMapper = mapToDistrictModel(data.data.objs)

    return {
      data: districtMapper,
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
