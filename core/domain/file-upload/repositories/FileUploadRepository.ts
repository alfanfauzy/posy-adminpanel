import { FormUploadImage } from '../models'
import { ResultMutation } from 'core/domain/vo/BaseResponse'

/**
 * Upload Image Public
 */

export type UploadImagePublic = ResultMutation<any>

export interface UploadImagePublicRepository extends UploadImagePublic {
  uploadImagePublic(params: FormUploadImage): void
}
