import {FormRoleEntities} from '@/organisms/form/role/entities';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

import {useCreateRoleMutation} from '../sources/CreateRoleQuery';
import {CreateRoleResponse} from '../types';

export const useCreateRoleUsecase = (
	options: MutationOptions<CreateRoleResponse>,
): any => {
	const {mutate, data, ...rest} = useCreateRoleMutation(options);

	const createRole = (payload: FormRoleEntities) => {
		mutate(payload);
	};

	return {
		createRole,
		data: data?.data.data,
		...rest,
	};
};
