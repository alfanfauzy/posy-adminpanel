import {FormRoleEntities} from '@/organisms/form/role/entities';
import Post from 'api/post';
import {AxiosError} from 'axios';
import {MutationOptions} from 'core/domain/vo/BaseMutation';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';
import {ErrorType} from 'types/index';

import {Response} from '../../../domain/vo/BaseResponse';
import {CreateRoleResponse} from '../types';

export const CreateRoleService = async (
	payload: FormRoleEntities,
): Promise<Response<CreateRoleResponse>> => {
	try {
		const response = await Post({
			endpoint: `/api/fnb-user-service/internal/role/create`,
			payload,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useCreateRoleMutation = (
	options: MutationOptions<CreateRoleResponse>,
) =>
	useMutation({
		mutationFn: (payload: FormRoleEntities) => CreateRoleService(payload),
		onError(error: ErrorType) {
			toast.error(error.message);
		},
		...options,
	});
