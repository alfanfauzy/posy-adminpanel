import { CreateAccessResponse } from '../types'
import { Response } from '../../../domain/vo/BaseResponse'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import Post from 'api/post'
import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { ErrorType } from 'types/index'
import { FormAccess } from '@/domain/access/models'

export const CreateAccessService = async (
  payload: FormAccess,
): Promise<Response<CreateAccessResponse>> => {
  try {
    const response = await Post({
      endpoint: `/api/fnb-user-service/internal/role/access/create`,
      payload,
    })

    return response
  } catch (error) {
    const err = error as AxiosError
    throw err.response?.data
  }
}

export const useCreateAccessMutation = (
  options: MutationOptions<CreateAccessResponse>,
) =>
  useMutation({
    mutationFn: (payload: FormAccess) => CreateAccessService(payload),
    onError(error: ErrorType) {
      toast.error(error.message)
    },
    ...options,
  })
