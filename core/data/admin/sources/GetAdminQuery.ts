import { GetAdminListDataResponse } from '../types'
import { Datalist, Response } from '../../../domain/vo/BaseResponse'
import { AxiosError } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import Post from 'api/post'
import { GetFilterAdminInput } from 'core/domain/admin/repositories/AdminRepository'

export const GetAdmin = async (
  input?: GetFilterAdminInput,
): Promise<Response<Datalist<GetAdminListDataResponse>>> => {
  try {
    const response = await Post({
      endpoint: `/api/fnb-user-service/internal/user/get-list`,
      payload: input,
    })

    return response
  } catch (error) {
    const err = error as AxiosError
    throw err
  }
}

export const useGetAdminQuery = (
  input?: GetFilterAdminInput,
  options?: UseQueryOptions<Response<Datalist<GetAdminListDataResponse>>>,
) =>
  useQuery<Response<Datalist<GetAdminListDataResponse>>>(
    ['admin/list'],
    () => GetAdmin(input),
    {
      // enabled: !!JSON.stringify(input),
      ...options,
    },
  )
