import { Response } from '../../../domain/vo/BaseResponse'
import { DeleteAdminResponse } from '../types'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import Post from 'api/post'
import { MutationOptions } from '@/data/common/types/BaseMutation'
import { DeleteAdminInput } from '@/domain/admin/repositories/AdminRepository'

export const DeleteAdminService = async (
  uuid: DeleteAdminInput,
): Promise<Response<DeleteAdminResponse>> => {
  try {
    const response = await Post({
      endpoint: `/api/fnb-user-service/internal/user/delete/${uuid}`,
      payload: {},
    })

    return response
  } catch (error) {
    const err = error as AxiosError
    throw err
  }
}

export const useDeleteAdminMutation = (
  options?: MutationOptions<DeleteAdminResponse>,
) =>
  useMutation({
    mutationFn: (payload: DeleteAdminInput) => DeleteAdminService(payload),
    ...options,
  })
