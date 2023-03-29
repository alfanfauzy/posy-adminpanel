import {UpdateAdminParams} from '@/domain/admin/repositories/AdminRepository';
import Post from 'api/post';
import {AxiosError} from 'axios';
import {MutationOptions} from 'core/domain/vo/BaseMutation';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';
import {ErrorType} from 'types/index';

import {Response} from '../../../domain/vo/BaseResponse';
import {UpdateAdminResponse} from '../types';

export const UpdateAdminService = async (
	params: UpdateAdminParams,
): Promise<Response<UpdateAdminResponse>> => {
	const {id, payload} = params;

	try {
		const response = await Post({
			endpoint: `/api/fnb-user-service/internal/user/update/${id}`,
			payload,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useUpdateAdminMutation = (
	options?: MutationOptions<UpdateAdminResponse>,
) =>
	useMutation({
		mutationFn: (payload: UpdateAdminParams) => UpdateAdminService(payload),
		onError(error: ErrorType) {
			toast.error(error.message);
		},
		...options,
	});
