import { LoginResponse } from '../types'
import { Response } from '../../../domain/vo/BaseResponse'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import Post from 'api/post'
import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { ErrorType } from 'types/index'
import { PostLoginPayload } from '@/domain/auth/models'

export const Login = async (
  payload: PostLoginPayload,
): Promise<Response<LoginResponse>> => {
  try {
    const response = await Post({
      endpoint: `/api/fnb-user-service/internal/auth/login`,
      payload,
    })

    return response
  } catch (error) {
    const err = error as AxiosError
    throw err.response?.data
  }
}

export const useLoginMutation = (options?: MutationOptions<LoginResponse>) =>
  useMutation({
    mutationFn: (payload: PostLoginPayload) => Login(payload),
    onError(error: ErrorType) {
      toast.error(error.message)
    },
    ...options,
  })
