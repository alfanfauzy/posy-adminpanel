import { mapToCityModel } from '../mappers/RegionMapper'
import { useGetCityQuery } from '../sources/GetCityQuery'
import {
  GetCityResult,
  GetFilterCityInput,
} from '@/domain/region/repository/RegionRepositories'

export const useGetCityUsecase = (
  input?: GetFilterCityInput,
): GetCityResult => {
  const { data, ...rest } = useGetCityQuery(input)

  if (data?.data.objs) {
    const cityMapper = mapToCityModel(data.data.objs)

    return {
      data: cityMapper,
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
