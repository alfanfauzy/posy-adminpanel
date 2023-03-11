import { useCreateAdminMutation } from '../sources/CreateAdminQuery'
import { CreateAdminResponse } from '../types'
import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { FormAdmin } from '@/domain/admin/models'

export const useCreateAdminUsecase = (
  options?: MutationOptions<CreateAdminResponse>,
): any => {
  const { mutate, data, ...rest } = useCreateAdminMutation(options)

  const createAdmin = (payload: FormAdmin) => {
    mutate(payload)
  }

  return {
    createAdmin,
    data: data?.data.data,
    ...rest,
  }
}
