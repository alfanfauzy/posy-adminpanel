import {UpdateRoleParams} from '@/domain/role/repositories/RoleRepository';
import Post from 'api/post';
import {AxiosError} from 'axios';
import {MutationOptions} from 'core/domain/vo/BaseMutation';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';
import {ErrorType} from 'types/index';

import {Response} from '../../../domain/vo/BaseResponse';
import {UpdateRoleResponse} from '../types';

export const UpdateRoleService = async (
	params: UpdateRoleParams,
): Promise<Response<UpdateRoleResponse>> => {
	const {id, payload} = params;
	try {
		const response = await Post({
			endpoint: `/api/fnb-user-service/internal/role/update/${id}`,
			payload,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useUpdateRoleMutation = (
	options?: MutationOptions<UpdateRoleResponse>,
) =>
	useMutation({
		mutationFn: (params: UpdateRoleParams) => UpdateRoleService(params),
		onError(error: ErrorType) {
			toast.error(error.message);
		},
		...options,
	});
