import { useDeleteAdminMutation } from '../sources/DeleteAdminQuery'
import { DeleteAdminResponse } from '../types'
import { MutationOptions } from '@/data/common/types/BaseMutation'
import { DeleteAdminInput } from '@/domain/admin/repositories/AdminRepository'

export const useDeleteAdminUsecase = (
  options?: MutationOptions<DeleteAdminResponse>,
): any => {
  const { mutate, data, ...rest } = useDeleteAdminMutation(options)

  const deleteAdmin = (payload: DeleteAdminInput) => {
    mutate(payload)
  }

  return {
    deleteAdmin,
    data: data?.data.data,
    ...rest,
  }
}
