import { UpdateOutletResponse } from '../type'
import { useUpdateOutletMutation } from '../sources/UpdateOutletQuery'
import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { UpdateOutletParams } from '@/domain/outlet/repositories/OutletRepositories'

export const useUpdateOutletUsecase = (
  options?: MutationOptions<UpdateOutletResponse>,
): any => {
  const { mutate, data, ...rest } = useUpdateOutletMutation(options)

  const updateOutlet = (payload: UpdateOutletParams) => {
    mutate(payload)
  }

  return {
    updateOutlet,
    data: data?.data.data,
    ...rest,
  }
}
