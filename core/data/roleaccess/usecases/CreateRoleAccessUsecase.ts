import {FormRoleAccess} from '@/domain/roleaccess/models';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

import {useCreateRoleAccessMutation} from '../sources/CreateRoleAccessQuery';
import {CreateRoleAccessResponse} from '../types';

export const useCreateRoleAccessUsecase = (
	options: MutationOptions<CreateRoleAccessResponse>,
): any => {
	const {mutate, data, ...rest} = useCreateRoleAccessMutation(options);

	const createRoleAccess = (payload: FormRoleAccess) => {
		mutate(payload);
	};

	return {
		createRoleAccess,
		data: data?.data.data,
		...rest,
	};
};
