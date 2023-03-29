import {DeleteAdminInput} from '@/domain/admin/repositories/AdminRepository';
import Post from 'api/post';
import {AxiosError} from 'axios';
import {MutationOptions} from 'core/domain/vo/BaseMutation';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';
import {ErrorType} from 'types/index';

import {Response} from '../../../domain/vo/BaseResponse';
import {DeleteAdminResponse} from '../types';

export const DeleteAdminService = async (
	uuid: DeleteAdminInput,
): Promise<Response<DeleteAdminResponse>> => {
	try {
		const response = await Post({
			endpoint: `/api/fnb-user-service/internal/user/delete/${uuid}`,
			payload: {},
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useDeleteAdminMutation = (
	options?: MutationOptions<DeleteAdminResponse>,
) =>
	useMutation({
		mutationFn: (payload: DeleteAdminInput) => DeleteAdminService(payload),
		onError(error: ErrorType) {
			toast.error(error.message);
		},
		...options,
	});
