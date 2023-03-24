import { Response } from '../../../domain/vo/BaseResponse'
import { DeleteOutletResponse } from '../type'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import Post from 'api/post'
import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { ErrorType } from 'types/index'
import { DeleteOutletInput } from '@/domain/outlet/repositories/OutletRepositories'

export const DeleteOutletService = async (
  uuid: DeleteOutletInput,
): Promise<Response<DeleteOutletResponse>> => {
  try {
    const response = await Post({
      endpoint: `/api/fnb-user-service/internal/outlet/delete/${uuid}`,
      payload: {},
    })

    return response
  } catch (error) {
    const err = error as AxiosError
    throw err.response?.data
  }
}

export const useDeleteOutletMutation = (
  options?: MutationOptions<DeleteOutletResponse>,
) =>
  useMutation({
    mutationFn: (payload: DeleteOutletInput) => DeleteOutletService(payload),
    onError(error: ErrorType) {
      toast.error(error.message)
    },
    ...options,
  })
