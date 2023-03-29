import {DeleteRoleParams} from '@/domain/role/repositories/RoleRepository';
import Post from 'api/post';
import {AxiosError} from 'axios';
import {MutationOptions} from 'core/domain/vo/BaseMutation';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';
import {ErrorType} from 'types/index';

import {Response} from '../../../domain/vo/BaseResponse';
import {DeleteRoleResponse} from '../types';

export const DeleteRoleService = async (
	uuid: string,
): Promise<Response<DeleteRoleResponse>> => {
	try {
		const response = await Post({
			endpoint: `/api/fnb-user-service/internal/role/delete/${uuid}`,
			payload: {},
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useDeleteRoleMutation = (
	options?: MutationOptions<DeleteRoleResponse>,
) =>
	useMutation({
		mutationFn: (uuid: DeleteRoleParams) => DeleteRoleService(uuid),
		onError(error: ErrorType) {
			toast.error(error.message);
		},
		...options,
	});
