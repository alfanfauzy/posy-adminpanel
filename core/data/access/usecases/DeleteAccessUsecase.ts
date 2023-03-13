import { useDeleteAccessMutation } from '../sources/DeleteAccessQuery'
import { DeleteAccessResponse } from '../types'
import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { DeleteAccessParams } from '@/domain/access/repositories/AccessRepository'

export const useDeleteAccessUsecase = (
  options?: MutationOptions<DeleteAccessResponse>,
): any => {
  const { mutate, data, ...rest } = useDeleteAccessMutation(options)

  const deleteAccess = (payload: DeleteAccessParams) => {
    mutate(payload)
  }

  return {
    deleteAccess,
    data: data?.data.data,
    ...rest,
  }
}
