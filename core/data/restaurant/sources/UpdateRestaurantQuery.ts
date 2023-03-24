import { UpdateRestaurantResponse } from '../types'
import { Response } from '../../../domain/vo/BaseResponse'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import Post from 'api/post'
import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { ErrorType } from 'types/index'
import { UpdateRestaurantParams } from '@/domain/restaurant/repositories/RestaurantRepository'

export const UpdateRestaurantService = async (
  params: UpdateRestaurantParams,
): Promise<Response<UpdateRestaurantResponse>> => {
  const { id, payload } = params
  try {
    const response = await Post({
      endpoint: `/api/fnb-user-service/internal/restaurant/update/${id}`,
      payload,
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    return response
  } catch (error) {
    const err = error as AxiosError
    throw err.response?.data
  }
}

export const useUpdateRestaurantMutation = (
  options?: MutationOptions<UpdateRestaurantResponse>,
) =>
  useMutation({
    mutationFn: (payload: UpdateRestaurantParams) =>
      UpdateRestaurantService(payload),
    onError(error: ErrorType) {
      toast.error(error.message)
    },
    ...options,
  })