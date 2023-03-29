import {ResultMutation} from 'core/domain/vo/BaseResponse';

import {FormUploadImage} from '../models';

/**
 * Upload Image Public
 */

export type UploadImagePublic = ResultMutation<any>;

export type UploadImagePublicRepository = {
	uploadImagePublic(params: FormUploadImage): void;
} & UploadImagePublic;
