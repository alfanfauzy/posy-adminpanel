import { CreateOutletResponse } from '../type'
import { useCreateOutletMutation } from '../sources/CreateOutletQuery'
import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { FormOutlet } from '@/domain/outlet/models'

export const useCreateOutletUsecase = (
  options?: MutationOptions<CreateOutletResponse>,
): any => {
  const { mutate, data, ...rest } = useCreateOutletMutation(options)

  const createOutlet = (payload: FormOutlet) => {
    mutate(payload)
  }

  return {
    createOutlet,
    data: data?.data.data,
    ...rest,
  }
}
