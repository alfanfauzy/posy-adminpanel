import { CreateRestaurantResponse } from '../types'
import { Response } from '../../../domain/vo/BaseResponse'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import Post from 'api/post'
import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { ErrorType } from 'types/index'
import { CreateRestaurantInput } from '@/domain/restaurant/repositories/RestaurantRepository'

export const CreateRestaurantService = async (
  payload: CreateRestaurantInput,
): Promise<Response<CreateRestaurantResponse>> => {
  try {
    const response = await Post({
      endpoint: `/api/fnb-user-service/internal/restaurant/create`,
      payload,
    })

    return response
  } catch (error) {
    const err = error as AxiosError
    throw err.response?.data
  }
}

export const useCreateRestaurantMutation = (
  options?: MutationOptions<CreateRestaurantResponse>,
) =>
  useMutation({
    mutationFn: (payload: CreateRestaurantInput) =>
      CreateRestaurantService(payload),
    onError(error: ErrorType) {
      toast.error(error.message)
    },
    ...options,
  })
