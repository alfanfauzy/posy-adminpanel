import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { UpdateAccessResponse } from '@/data/access/types'
import { UpdateAccessRepository } from '@/domain/access/repositories/AccessRepository'
import { useUpdateAccessUsecase } from '@/data/access/usecases/UpdateAccessUsecase'

export const useUpdateAccessViewModal = (
  options?: MutationOptions<UpdateAccessResponse>,
): UpdateAccessRepository => {
  const result = useUpdateAccessUsecase(options)

  return result
}
