import { useUpdateAdminMutation } from '../sources/UpdateAdminQuery'
import { UpdateAdminResponse } from '../types'
import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { UpdateAdminParams } from '@/domain/admin/repositories/AdminRepository'

export const useUpdateAdminUsecase = (
  options?: MutationOptions<UpdateAdminResponse>,
): any => {
  const { mutate, data, ...rest } = useUpdateAdminMutation(options)

  const updateAdmin = (payload: UpdateAdminParams) => {
    mutate(payload)
  }

  return {
    updateAdmin,
    data: data?.data.data,
    ...rest,
  }
}
