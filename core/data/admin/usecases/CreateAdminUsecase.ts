import {FormAdmin} from '@/domain/admin/models';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

import {useCreateAdminMutation} from '../sources/CreateAdminMutation';
import {CreateAdminResponse} from '../types';

export const useCreateAdminUsecase = (
	options?: MutationOptions<CreateAdminResponse>,
): any => {
	const {mutate, data, ...rest} = useCreateAdminMutation(options);

	const createAdmin = (payload: FormAdmin) => {
		mutate(payload);
	};

	return {
		createAdmin,
		data: data?.data.data,
		...rest,
	};
};
