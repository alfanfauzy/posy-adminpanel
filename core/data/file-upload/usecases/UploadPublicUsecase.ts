import {FormUploadImage} from '@/domain/file-upload/models';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

import {usePublicImagePublicMutation} from '../sources/UploadPublicQuery';
import {UploadFilePublicResponse} from '../types';

export const useUploadImagePublicUsecase = (
	options: MutationOptions<UploadFilePublicResponse>,
): any => {
	const {mutate, data, ...rest} = usePublicImagePublicMutation(options);

	const uploadImagePublic = (payload: FormUploadImage) => {
		mutate(payload);
	};

	return {
		uploadImagePublic,
		data: data?.data,
		...rest,
	};
};
