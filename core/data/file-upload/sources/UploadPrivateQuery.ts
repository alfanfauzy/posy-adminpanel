import {FormUploadImage} from '@/domain/file-upload/models';
import {Response} from '@/domain/vo/BaseResponse';
import Post from 'api/post';
import {AxiosError} from 'axios';
import {UploadFilePrivateResponse} from 'core/data/file-upload/types';
import {MutationOptions} from 'core/domain/vo/BaseMutation';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';
import {ErrorType} from 'types/index';

export const UploadImagePrivateService = async (
	payload: FormUploadImage,
): Promise<Response<UploadFilePrivateResponse>> => {
	try {
		const response = await Post({
			endpoint: `/api/fnb-document-service/v1/document/internal/private/upload`,
			payload,
			headers: {'Content-Type': 'multipart/form-data'},
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useUploadImagePrivateMutation = (
	options: MutationOptions<UploadFilePrivateResponse>,
) =>
	useMutation({
		mutationFn: (payload: FormUploadImage) =>
			UploadImagePrivateService(payload),
		onError(error: ErrorType) {
			toast.error(error.message);
		},
		...options,
	});
