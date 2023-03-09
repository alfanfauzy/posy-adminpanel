import { Response } from '../../../domain/vo/BaseResponse'
import { DeleteRoleResponse } from '../types'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import Post from 'api/post'
import { MutationOptions } from '@/data/common/types/BaseMutation'

export const DeleteRoleService = async (
  uuid: string,
): Promise<Response<DeleteRoleResponse>> => {
  try {
    const response = await Post({
      endpoint: `/api/fnb-user-service/internal/role/delete/${uuid}`,
      payload: {},
    })

    return response
  } catch (error) {
    const err = error as AxiosError
    throw err
  }
}

export const useDeleteRoleMutation = (
  uuid: string,
  options?: MutationOptions<DeleteRoleResponse>,
) =>
  useMutation({
    mutationFn: () => DeleteRoleService(uuid),
    ...options,
  })
