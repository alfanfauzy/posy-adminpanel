import {FormAccess} from '@/domain/access/models';
import Post from 'api/post';
import {AxiosError} from 'axios';
import {MutationOptions} from 'core/domain/vo/BaseMutation';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';
import {ErrorType} from 'types/index';

import {Response} from '../../../domain/vo/BaseResponse';
import {CreateAccessResponse} from '../types';

export const CreateAccessService = async (
	payload: FormAccess,
): Promise<Response<CreateAccessResponse>> => {
	try {
		const response = await Post({
			endpoint: `/api/fnb-user-service/internal/role/access/create`,
			payload,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useCreateAccessMutation = (
	options: MutationOptions<CreateAccessResponse>,
) =>
	useMutation({
		mutationFn: (payload: FormAccess) => CreateAccessService(payload),
		onError(error: ErrorType) {
			toast.error(error.message);
		},
		...options,
	});
