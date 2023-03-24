import { Response } from '../../../domain/vo/BaseResponse'
import { CreateOutletResponse } from '../type'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import Post from 'api/post'
import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { ErrorType } from 'types/index'
import { CreateOutletInput } from '@/domain/outlet/repositories/OutletRepositories'

export const CreateOutletService = async (
  payload: CreateOutletInput,
): Promise<Response<CreateOutletResponse>> => {
  try {
    const response = await Post({
      endpoint: `/api/fnb-user-service/internal/outlet/create`,
      payload,
    })

    return response
  } catch (error) {
    const err = error as AxiosError
    throw err.response?.data
  }
}

export const useCreateOutletMutation = (
  options?: MutationOptions<CreateOutletResponse>,
) =>
  useMutation({
    mutationFn: (payload: CreateOutletInput) => CreateOutletService(payload),
    onError(error: ErrorType) {
      toast.error(error.message)
    },
    ...options,
  })
