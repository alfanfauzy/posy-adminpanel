import { Response } from '../../../domain/vo/BaseResponse'
import { UpdateAdminResponse } from '../types'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import Post from 'api/post'
import { MutationOptions } from '@/data/common/types/BaseMutation'
import { UpdateParams } from '@/domain/admin/repositories/AdminRepository'

export const UpdateAdminService = async (
  payload: UpdateParams,
): Promise<Response<UpdateAdminResponse>> => {
  const { id, params } = payload

  try {
    const response = await Post({
      endpoint: `/api/fnb-user-service/internal/user/update/${id}`,
      payload: params,
    })

    return response
  } catch (error) {
    const err = error as AxiosError
    throw err
  }
}

export const useUpdateAdminMutation = (
  options?: MutationOptions<UpdateAdminResponse>,
) =>
  useMutation({
    mutationFn: (payload: UpdateParams) => UpdateAdminService(payload),
    ...options,
  })
