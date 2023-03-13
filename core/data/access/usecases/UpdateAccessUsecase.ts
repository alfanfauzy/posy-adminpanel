import { useUpdateAccessMutation } from '../sources/UpdateAccessQuery'
import { UpdateAccessResponse } from '../types'
import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { UpdateAccessParams } from '@/domain/access/repositories/AccessRepository'

export const useUpdateAccessUsecase = (
  options?: MutationOptions<UpdateAccessResponse>,
): any => {
  const { mutate, data, ...rest } = useUpdateAccessMutation(options)

  const updateAccess = (payload: UpdateAccessParams) => {
    mutate(payload)
  }

  return {
    updateAccess,
    data: data?.data.data,
    ...rest,
  }
}
