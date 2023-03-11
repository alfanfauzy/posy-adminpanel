import { CreateRoleResponse } from '../types'
import { Response } from '../../../domain/vo/BaseResponse'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import Post from 'api/post'
import { MutationOptions } from '@/data/common/types/BaseMutation'
import { FormRoleEntities } from '@/organisms/form/role/entities'

export const CreateRoleService = async (
  payload: FormRoleEntities,
): Promise<Response<CreateRoleResponse>> => {
  try {
    const response = await Post({
      endpoint: `/api/fnb-user-service/internal/role/create`,
      payload,
    })

    return response
  } catch (error) {
    const err = error as AxiosError
    throw err
  }
}

export const useCreateRoleMutation = (
  options?: MutationOptions<CreateRoleResponse>,
) =>
  useMutation({
    mutationFn: (payload: FormRoleEntities) => CreateRoleService(payload),
    ...options,
  })
