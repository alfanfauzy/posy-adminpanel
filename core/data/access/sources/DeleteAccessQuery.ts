import {DeleteAccessParams} from '@/domain/access/repositories/AccessRepository';
import Post from 'api/post';
import {AxiosError} from 'axios';
import {MutationOptions} from 'core/domain/vo/BaseMutation';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';
import {ErrorType} from 'types/index';

import {Response} from '../../../domain/vo/BaseResponse';
import {DeleteAccessResponse} from '../types';

export const DeleteAccessService = async (
	uuid: string,
): Promise<Response<DeleteAccessResponse>> => {
	try {
		const response = await Post({
			endpoint: `/api/fnb-user-service/internal/role/access/delete/${uuid}`,
			payload: {},
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useDeleteAccessMutation = (
	options?: MutationOptions<DeleteAccessResponse>,
) =>
	useMutation({
		mutationFn: (uuid: DeleteAccessParams) => DeleteAccessService(uuid),
		onError(error: ErrorType) {
			toast.error(error.message);
		},
		...options,
	});
