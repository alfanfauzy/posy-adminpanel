import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { CreateAccessResponse } from '@/data/access/types'
import { CreateAccessRepository } from '@/domain/access/repositories/AccessRepository'
import { useCreateAccessUsecase } from '@/data/access/usecases/CreateAccessUsecase'

export const useCreateAccessViewModal = (
  options: MutationOptions<CreateAccessResponse>,
): CreateAccessRepository => {
  const result = useCreateAccessUsecase(options)

  return result
}
