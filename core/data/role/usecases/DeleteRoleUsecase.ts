import {DeleteRoleParams} from '@/domain/role/repositories/RoleRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

import {useDeleteRoleMutation} from '../sources/DeleteRoleQuery';
import {DeleteRoleResponse} from '../types';

export const useDeleteRoleUsecase = (
	options?: MutationOptions<DeleteRoleResponse>,
): any => {
	const {mutate, data, ...rest} = useDeleteRoleMutation(options);

	const deleteRole = (uuid: DeleteRoleParams) => {
		mutate(uuid);
	};

	return {
		deleteRole,
		data: data?.data.data,
		...rest,
	};
};
