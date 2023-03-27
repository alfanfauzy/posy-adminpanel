import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { UploadFilePublicResponse } from 'core/data/file-upload/types'
import Post from 'api/post'
import { MutationOptions } from 'core/domain/vo/BaseMutation'
import { ErrorType } from 'types/index'
import { FormUploadImage } from '@/domain/file-upload/models'
import { Response } from '@/domain/vo/BaseResponse'

export const UploadImagePublicService = async (
  payload: FormUploadImage,
): Promise<Response<UploadFilePublicResponse>> => {
  try {
    const response = await Post({
      endpoint: `/api/fnb-document-service/v1/document/internal/public/upload`,
      payload,
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    return response
  } catch (error) {
    const err = error as AxiosError
    throw err.response?.data
  }
}

export const usePublicImagePublicMutation = (
  options: MutationOptions<UploadFilePublicResponse>,
) =>
  useMutation({
    mutationFn: (payload: FormUploadImage) => UploadImagePublicService(payload),
    onError(error: ErrorType) {
      toast.error(error.message)
    },
    ...options,
  })
