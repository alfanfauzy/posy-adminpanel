import { Response } from '../../../domain/vo/BaseResponse'
import { UpdateRoleResponse } from '../types'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import Post from 'api/post'
import { UpdateRoleParams } from '@/domain/role/repositories/RoleRepository'
import { MutationOptions } from '@/data/common/types/BaseMutation'

export const UpdateRoleService = async (
  params: UpdateRoleParams,
): Promise<Response<UpdateRoleResponse>> => {
  const { id, payload } = params
  try {
    const response = await Post({
      endpoint: `/api/fnb-user-service/internal/role/update/${id}`,
      payload,
    })

    return response
  } catch (error) {
    const err = error as AxiosError
    throw err
  }
}

export const useUpdateRoleMutation = (
  options?: MutationOptions<UpdateRoleResponse>,
) =>
  useMutation({
    mutationFn: (params: UpdateRoleParams) => UpdateRoleService(params),
    ...options,
  })
