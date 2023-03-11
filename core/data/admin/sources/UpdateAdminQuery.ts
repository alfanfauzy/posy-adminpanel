import { Response } from '../../../domain/vo/BaseResponse'
import { UpdateAdminResponse } from '../types'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import Post from 'api/post'
import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { UpdateAdminParams } from '@/domain/admin/repositories/AdminRepository'

export const UpdateAdminService = async (
  params: UpdateAdminParams,
): Promise<Response<UpdateAdminResponse>> => {
  const { id, payload } = params

  try {
    const response = await Post({
      endpoint: `/api/fnb-user-service/internal/user/update/${id}`,
      payload,
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
    mutationFn: (payload: UpdateAdminParams) => UpdateAdminService(payload),
    ...options,
  })
