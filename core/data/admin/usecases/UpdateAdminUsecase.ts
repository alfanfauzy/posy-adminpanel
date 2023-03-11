import { useUpdateAdminMutation } from '../sources/UpdateAdminQuery'
import { UpdateAdminResponse } from '../types'
import { MutationOptions } from '@/data/common/types/BaseMutation'
import { UpdateParams } from '@/domain/admin/repositories/AdminRepository'

export const useUpdateAdminUsecase = (
  options?: MutationOptions<UpdateAdminResponse>,
): any => {
  const { mutate, data, ...rest } = useUpdateAdminMutation(options)

  const updateAdmin = (payload: UpdateParams) => {
    mutate(payload)
  }

  return {
    updateAdmin,
    data: data?.data.data,
    ...rest,
  }
}
