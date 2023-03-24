import { Datalist, Response } from '../../../domain/vo/BaseResponse'
import { GetProvinceList } from '../type'
import { AxiosError } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import Post from 'api/post'
import { GetFilterProvinceInput } from '@/domain/region/repository/RegionRepositories'

export const GetProvinces = async (
  input?: GetFilterProvinceInput,
): Promise<Response<Datalist<GetProvinceList>>> => {
  try {
    const response = await Post({
      endpoint: `/api/fnb-user-service/internal/region/province/get-list`,
      payload: input,
    })

    return response
  } catch (error) {
    const err = error as AxiosError
    throw err.response?.data
  }
}

export const useGetProvinceQuery = (
  input?: GetFilterProvinceInput,
  options?: UseQueryOptions<Response<Datalist<GetProvinceList>>>,
) =>
  useQuery<Response<Datalist<GetProvinceList>>>(
    ['provinces/list', JSON.stringify(input)],
    () => GetProvinces(input),
    {
      enabled: !!JSON.stringify(input),
      ...options,
    },
  )
