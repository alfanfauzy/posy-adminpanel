import { useCreateAccessMutation } from '../sources/CreateAccessQuery'
import { CreateAccessResponse } from '../types'
import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { FormAccess } from '@/domain/access/models'

export const useCreateAccessUsecase = (
  options: MutationOptions<CreateAccessResponse>,
): any => {
  const { mutate, data, ...rest } = useCreateAccessMutation(options)

  const createAccess = (payload: FormAccess) => {
    mutate(payload)
  }

  return {
    createAccess,
    data: data?.data.data,
    ...rest,
  }
}
