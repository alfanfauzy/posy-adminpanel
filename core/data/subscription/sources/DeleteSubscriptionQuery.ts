import { Response } from '../../../domain/vo/BaseResponse'
import { DeleteSubscriptionResponse } from '../types'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import Post from 'api/post'
import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { ErrorType } from 'types/index'
import { DeleteSubscriptionParams } from '@/domain/subscription/repositories/SubscriptionRepository'

export const DeleteSubscriptionService = async (
  uuid: string,
): Promise<Response<DeleteSubscriptionResponse>> => {
  try {
    const response = await Post({
      endpoint: `/api/fnb-user-service/internal/subscription/delete/${uuid}`,
      payload: {},
    })

    return response
  } catch (error) {
    const err = error as AxiosError
    throw err.response?.data
  }
}

export const useDeleteSubscriptionMutation = (
  options?: MutationOptions<DeleteSubscriptionResponse>,
) =>
  useMutation({
    mutationFn: (uuid: DeleteSubscriptionParams) =>
      DeleteSubscriptionService(uuid),
    onError(error: ErrorType) {
      toast.error(error.message)
    },
    ...options,
  })
