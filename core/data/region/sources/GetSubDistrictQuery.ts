import { Datalist, Response } from '../../../domain/vo/BaseResponse'
import { GetSubDistrictList } from '../type'
import { AxiosError } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import Post from 'api/post'
import { GetFilterSubDistrictInput } from '@/domain/region/repository/RegionRepositories'

export const GetSubDistrices = async (
  input?: GetFilterSubDistrictInput,
): Promise<Response<Datalist<GetSubDistrictList>>> => {
  try {
    const response = await Post({
      endpoint: `/api/fnb-user-service/internal/region/subdistrict/get-list`,
      payload: input,
    })

    return response
  } catch (error) {
    const err = error as AxiosError
    throw err.response?.data
  }
}

export const useGetSubDistricesQuery = (
  input?: GetFilterSubDistrictInput,
  options?: UseQueryOptions<Response<Datalist<GetSubDistrictList>>>,
) =>
  useQuery<Response<Datalist<GetSubDistrictList>>>(
    ['subdistrices/list', JSON.stringify(input)],
    () => GetSubDistrices(input),
    {
      enabled: !!JSON.stringify(input),
      ...options,
    },
  )
