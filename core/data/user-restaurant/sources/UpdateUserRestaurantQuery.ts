import { Response } from '../../../domain/vo/BaseResponse'
import { UpdateUserRestaurantResponse } from '../types'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import Post from 'api/post'
import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { ErrorType } from 'types/index'
import { UpdateUserRestaurantParams } from '@/domain/user-restaurant/repositories/UserRestaurantRepository'

export const UpdateUserRestaurantService = async (
  params: UpdateUserRestaurantParams,
): Promise<Response<UpdateUserRestaurantResponse>> => {
  const { id, payload } = params
  try {
    const response = await Post({
      endpoint: `/api/fnb-user-service/internal/restaurant/user/update/${id}`,
      payload,
    })

    return response
  } catch (error) {
    const err = error as AxiosError
    throw err.response?.data
  }
}

export const useUpdateUserRestaurantMutation = (
  options?: MutationOptions<UpdateUserRestaurantResponse>,
) =>
  useMutation({
    mutationFn: (params: UpdateUserRestaurantParams) =>
      UpdateUserRestaurantService(params),
    onError(error: ErrorType) {
      toast.error(error.message)
    },
    ...options,
  })
