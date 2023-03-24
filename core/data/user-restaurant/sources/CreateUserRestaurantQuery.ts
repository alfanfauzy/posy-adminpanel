import { CreateUserRestaurantResponse } from '../types'
import { Response } from '../../../domain/vo/BaseResponse'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import Post from 'api/post'
import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { ErrorType } from 'types/index'
import { FormUserRestaurant } from '@/domain/user-restaurant/models'

export const CreateUserRestaurantService = async (
  payload: FormUserRestaurant,
): Promise<Response<CreateUserRestaurantResponse>> => {
  try {
    const response = await Post({
      endpoint: `/api/fnb-user-service/internal/restaurant/user/create`,
      payload,
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    return response
  } catch (error) {
    const err = error as AxiosError
    throw err.response?.data
  }
}

export const useCreateUserRestaurantMutation = (
  options?: MutationOptions<CreateUserRestaurantResponse>,
) =>
  useMutation({
    mutationFn: (payload: FormUserRestaurant) =>
      CreateUserRestaurantService(payload),
    onError(error: ErrorType) {
      toast.error(error.message)
    },
    ...options,
  })
