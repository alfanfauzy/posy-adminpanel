import {useUploadImagePrivateMutation} from '@/data/file-upload/sources/UploadPrivateQuery';
import {UploadFilePrivateResponse} from '@/data/file-upload/types';
import {FormUploadImage} from '@/domain/file-upload/models';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useUploadImagePrivateUsecase = (
	options: MutationOptions<UploadFilePrivateResponse>,
): any => {
	const {mutate, data, ...rest} = useUploadImagePrivateMutation(options);

	const uploadImagePrivate = (payload: FormUploadImage) => {
		mutate(payload);
	};

	return {
		uploadImagePrivate,
		data: data?.data,
		...rest,
	};
};
