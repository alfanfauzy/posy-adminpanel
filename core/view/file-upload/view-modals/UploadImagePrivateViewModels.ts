import {useUploadImagePrivateUsecase} from '@/data/file-upload/usecases/UploadPrivateUsecase';
import {UploadImagePrivateRepository} from '@/domain/file-upload/repositories/FileUploadRepository';
import {UploadFilePrivateResponse} from 'core/data/file-upload/types';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useUploadImagePrivateViewModal = (
	options: MutationOptions<UploadFilePrivateResponse>,
): UploadImagePrivateRepository => {
	const result = useUploadImagePrivateUsecase(options);

	return result;
};
