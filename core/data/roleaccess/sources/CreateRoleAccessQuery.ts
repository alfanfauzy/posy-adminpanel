import {FormRoleAccess} from '@/domain/roleaccess/models';
import Post from 'api/post';
import {AxiosError} from 'axios';
import {MutationOptions} from 'core/domain/vo/BaseMutation';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';
import {ErrorType} from 'types/index';

import {Response} from '../../../domain/vo/BaseResponse';
import {CreateRoleAccessResponse} from '../types';

export const CreateRoleAccessService = async (
	payload: FormRoleAccess,
): Promise<Response<CreateRoleAccessResponse>> => {
	try {
		const response = await Post({
			endpoint: `/api/fnb-user-service/internal/role/role-access/upsert`,
			payload,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useCreateRoleAccessMutation = (
	options: MutationOptions<CreateRoleAccessResponse>,
) =>
	useMutation({
		mutationFn: (payload: FormRoleAccess) => CreateRoleAccessService(payload),
		onError(error: ErrorType) {
			toast.error(error.message);
		},
		...options,
	});
