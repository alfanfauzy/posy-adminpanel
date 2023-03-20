import { LoginResponse } from '../types'
import { useLoginMutation } from '../sources/PostAuthLogin'
import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { PostLoginPayload } from '@/domain/auth/models'

export const useLoginUsecase = (
  options?: MutationOptions<LoginResponse>,
): any => {
  const { mutate, data, ...rest } = useLoginMutation(options)

  const loginPost = (payload: PostLoginPayload) => {
    mutate(payload)
  }

  return {
    loginPost,
    data: data?.data,
    ...rest,
  }
}
