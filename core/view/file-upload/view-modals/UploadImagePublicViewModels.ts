import {useUploadImagePublicUsecase} from '@/data/file-upload/usecases/UploadPublicUsecase';
import {UploadImagePublicRepository} from '@/domain/file-upload/repositories/FileUploadRepository';
import {UploadFilePublicResponse} from 'core/data/file-upload/types';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useUploadImagePublicViewModal = (
	options: MutationOptions<UploadFilePublicResponse>,
): UploadImagePublicRepository => {
	const result = useUploadImagePublicUsecase(options);

	return result;
};
