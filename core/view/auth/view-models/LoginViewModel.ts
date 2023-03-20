import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { LoginResponse } from '@/data/auth/types'
import { PostLoginRepository } from '@/domain/auth/repositories/AuthRepository'
import { useLoginUsecase } from '@/data/auth/usecases/PostAuthLoginUsecases'

export const useLoginViewModal = (
  options: MutationOptions<LoginResponse>,
): PostLoginRepository => {
  const result = useLoginUsecase(options)

  return result
}
