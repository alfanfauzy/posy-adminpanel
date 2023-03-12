import { CreateAdminResponse } from '../types'
import { Response } from '../../../domain/vo/BaseResponse'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import Post from 'api/post'
import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { CreateAdminInput } from '@/domain/admin/repositories/AdminRepository'
import { ErrorType } from 'types/index'

export const CreateAdminService = async (
  payload: CreateAdminInput,
): Promise<Response<CreateAdminResponse>> => {
  try {
    const response = await Post({
      endpoint: `/api/fnb-user-service/internal/user/create`,
      payload: payload.params,
    })

    return response
  } catch (error) {
    const err = error as AxiosError
    throw err.response?.data
  }
}

export const useCreateAdminMutation = (
  options?: MutationOptions<CreateAdminResponse>,
) =>
  useMutation({
    mutationFn: (payload: CreateAdminInput) => CreateAdminService(payload),
    onError(error: ErrorType) {
      toast.error(error.message)
    },
    ...options,
  })
