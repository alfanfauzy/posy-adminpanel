import { Datalist, Response } from '../../../domain/vo/BaseResponse'
import { GetDistrictList } from '../type'
import { AxiosError } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import Post from 'api/post'
import { GetFilterDistrictInput } from '@/domain/region/repository/RegionRepositories'

export const GetDistrices = async (
  input?: GetFilterDistrictInput,
): Promise<Response<Datalist<GetDistrictList>>> => {
  try {
    const response = await Post({
      endpoint: `/api/fnb-user-service/internal/region/district/get-list`,
      payload: input,
    })

    return response
  } catch (error) {
    const err = error as AxiosError
    throw err.response?.data
  }
}

export const useGetDistricesQuery = (
  input?: GetFilterDistrictInput,
  options?: UseQueryOptions<Response<Datalist<GetDistrictList>>>,
) =>
  useQuery<Response<Datalist<GetDistrictList>>>(
    ['districes/list', JSON.stringify(input)],
    () => GetDistrices(input),
    {
      enabled: !!JSON.stringify(input),
      ...options,
    },
  )
