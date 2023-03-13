import { Response } from '../../../domain/vo/BaseResponse'
import { UpdateSubscriptionResponse } from '../types'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import Post from 'api/post'
import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { ErrorType } from 'types/index'
import { UpdateSubscriptionParams } from '@/domain/subscription/repositories/SubscriptionRepository'

export const UpdateSubscriptionService = async (
  params: UpdateSubscriptionParams,
): Promise<Response<UpdateSubscriptionResponse>> => {
  const { id, payload } = params
  try {
    const response = await Post({
      endpoint: `/api/fnb-user-service/internal/role/update/${id}`,
      payload,
    })

    return response
  } catch (error) {
    const err = error as AxiosError
    throw err.response?.data
  }
}

export const useUpdateSubscriptionMutation = (
  options?: MutationOptions<UpdateSubscriptionResponse>,
) =>
  useMutation({
    mutationFn: (params: UpdateSubscriptionParams) =>
      UpdateSubscriptionService(params),
    onError(error: ErrorType) {
      toast.error(error.message)
    },
    ...options,
  })
