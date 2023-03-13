import { Response } from '../../../domain/vo/BaseResponse'
import { UpdateAccessResponse } from '../types'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import Post from 'api/post'
import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { ErrorType } from 'types/index'
import { UpdateAccessParams } from '@/domain/access/repositories/AccessRepository'

export const UpdateAccessService = async (
  params: UpdateAccessParams,
): Promise<Response<UpdateAccessResponse>> => {
  const { id, payload } = params
  try {
    const response = await Post({
      endpoint: `/api/fnb-user-service/internal/role/access/update/${id}`,
      payload,
    })

    return response
  } catch (error) {
    const err = error as AxiosError
    throw err.response?.data
  }
}

export const useUpdateAccessMutation = (
  options?: MutationOptions<UpdateAccessResponse>,
) =>
  useMutation({
    mutationFn: (params: UpdateAccessParams) => UpdateAccessService(params),
    onError(error: ErrorType) {
      toast.error(error.message)
    },
    ...options,
  })
