import { Response } from '../../../domain/vo/BaseResponse'
import { DeleteRestaurantResponse } from '../types'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import Post from 'api/post'
import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { ErrorType } from 'types/index'
import { DeleteRestaurantInput } from '@/domain/restaurant/repositories/RestaurantRepository'

export const DeleteRestaurantService = async (
  uuid: DeleteRestaurantInput,
): Promise<Response<DeleteRestaurantResponse>> => {
  try {
    const response = await Post({
      endpoint: `/api/fnb-user-service/internal/restaurant/delete/${uuid}`,
      payload: {},
    })

    return response
  } catch (error) {
    const err = error as AxiosError
    throw err.response?.data
  }
}

export const useDeleteRestaurantMutation = (
  options?: MutationOptions<DeleteRestaurantResponse>,
) =>
  useMutation({
    mutationFn: (payload: DeleteRestaurantInput) =>
      DeleteRestaurantService(payload),
    onError(error: ErrorType) {
      toast.error(error.message)
    },
    ...options,
  })
