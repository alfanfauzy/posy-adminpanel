import {UpdateRoleParams} from '@/domain/role/repositories/RoleRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

import {useUpdateRoleMutation} from '../sources/UpdateRoleQuery';
import {UpdateRoleResponse} from '../types';

export const useUpdateRoleUsecase = (
	options?: MutationOptions<UpdateRoleResponse>,
): any => {
	const {mutate, data, ...rest} = useUpdateRoleMutation(options);

	const updateRole = (params: UpdateRoleParams) => {
		mutate(params);
	};

	return {
		updateRole,
		data: data?.data.data,
		...rest,
	};
};
