import { Response } from '../../../domain/vo/BaseResponse'
import { DeleteRoleResponse } from '../types'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import Post from 'api/post'
import { MutationOptions } from '@/data/common/types/BaseMutation'
import { DeleteRoleParams } from '@/domain/role/repositories/RoleRepository'

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
  options?: MutationOptions<DeleteRoleResponse>,
) =>
  useMutation({
    mutationFn: (uuid: DeleteRoleParams) => DeleteRoleService(uuid),
    ...options,
  })
