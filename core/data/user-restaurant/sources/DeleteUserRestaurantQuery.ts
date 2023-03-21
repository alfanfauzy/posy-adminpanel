import { Response } from '../../../domain/vo/BaseResponse'
import { DeleteUserRestaurantResponse } from '../types'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import Post from 'api/post'
import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { ErrorType } from 'types/index'
import { DeleteUserRestaurantParams } from '@/domain/user-restaurant/repositories/UserRestaurantRepository'

export const DeleteUserRestaurantService = async (
  uuid: DeleteUserRestaurantParams,
): Promise<Response<DeleteUserRestaurantResponse>> => {
  try {
    const response = await Post({
      endpoint: `/api/fnb-user-service/internal/restaurant/user/delete/${uuid}`,
      payload: {},
    })

    return response
  } catch (error) {
    const err = error as AxiosError
    throw err.response?.data
  }
}

export const useDeleteUserRestaurantMutation = (
  options?: MutationOptions<DeleteUserRestaurantResponse>,
) =>
  useMutation({
    mutationFn: (payload: DeleteUserRestaurantParams) =>
      DeleteUserRestaurantService(payload),
    onError(error: ErrorType) {
      toast.error(error.message)
    },
    ...options,
  })
