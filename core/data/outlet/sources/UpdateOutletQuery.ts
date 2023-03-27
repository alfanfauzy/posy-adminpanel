import { Response } from '../../../domain/vo/BaseResponse'
import { UpdateOutletResponse } from '../type'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import Post from 'api/post'
import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { ErrorType } from 'types/index'
import { UpdateOutletParams } from '@/domain/outlet/repositories/OutletRepositories'

export const UpdateOutletService = async (
  params: UpdateOutletParams,
): Promise<Response<UpdateOutletResponse>> => {
  const { id, payload } = params

  try {
    const response = await Post({
      endpoint: `/api/fnb-user-service/internal/outlet/update/${id}`,
      payload,
    })

    return response
  } catch (error) {
    const err = error as AxiosError
    throw err.response?.data
  }
}

export const useUpdateOutletMutation = (
  options?: MutationOptions<UpdateOutletResponse>,
) =>
  useMutation({
    mutationFn: (payload: UpdateOutletParams) => UpdateOutletService(payload),
    onError(error: ErrorType) {
      toast.error(error.message)
    },
    ...options,
  })
