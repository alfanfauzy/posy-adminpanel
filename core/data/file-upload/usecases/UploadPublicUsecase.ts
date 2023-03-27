import { usePublicImagePublicMutation } from '../sources/UploadPublicQuery'
import { UploadFilePublicResponse } from '../types'
import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { FormUploadImage } from '@/domain/file-upload/models'

export const useUploadImagePublicUsecase = (
  options: MutationOptions<UploadFilePublicResponse>,
): any => {
  const { mutate, data, ...rest } = usePublicImagePublicMutation(options)

  const uploadImagePublic = (payload: FormUploadImage) => {
    mutate(payload)
  }

  return {
    uploadImagePublic,
    data: data?.data,
    ...rest,
  }
}
