import { Response } from '../../../domain/vo/BaseResponse'
import { UpdateRoleResponse } from '../types'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import Post from 'api/post'
import { UpdateRoleInput } from '@/domain/role/repositories/RoleRepository'
import { MutationOptions } from '@/data/common/types/BaseMutation'

export const UpdateRoleService = async (
  payload: UpdateRoleInput,
): Promise<Response<UpdateRoleResponse>> => {
  const payloadBody = payload?.payload
  try {
    const response = await Post({
      endpoint: `/api/fnb-user-service/internal/role/update/${payload?.id}`,
      payload: payloadBody,
    })

    return response
  } catch (error) {
    const err = error as AxiosError
    throw err
  }
}

export const useUpdateRoleMutation = (
  payload: UpdateRoleInput,
  options?: MutationOptions<UpdateRoleResponse>,
) =>
  useMutation({
    mutationFn: () => UpdateRoleService(payload),
    ...options,
  })
