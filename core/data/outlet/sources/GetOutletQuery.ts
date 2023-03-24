import { Datalist, Response } from '../../../domain/vo/BaseResponse'
import { GetOutletListDataResponse } from '../type'
import { AxiosError } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import Post from 'api/post'
import { GetFilterOutletInput } from '@/domain/outlet/repositories/OutletRepositories'

export const GetOutlet = async (
  input?: GetFilterOutletInput,
): Promise<Response<Datalist<GetOutletListDataResponse>>> => {
  try {
    const response = await Post({
      endpoint: `/api/fnb-user-service/internal/outlet/get-list`,
      payload: input,
    })

    return response
  } catch (error) {
    const err = error as AxiosError
    throw err.response?.data
  }
}

export const useGetOutletQuery = (
  input?: GetFilterOutletInput,
  options?: UseQueryOptions<Response<Datalist<GetOutletListDataResponse>>>,
) =>
  useQuery<Response<Datalist<GetOutletListDataResponse>>>(
    ['outlet/list', JSON.stringify(input)],
    () => GetOutlet(input),
    {
      enabled: !!JSON.stringify(input),
      ...options,
    },
  )
