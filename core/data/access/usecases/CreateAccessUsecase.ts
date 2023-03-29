import {FormAccess} from '@/domain/access/models';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

import {useCreateAccessMutation} from '../sources/CreateAccessQuery';
import {CreateAccessResponse} from '../types';

export const useCreateAccessUsecase = (
	options: MutationOptions<CreateAccessResponse>,
): any => {
	const {mutate, data, ...rest} = useCreateAccessMutation(options);

	const createAccess = (payload: FormAccess) => {
		mutate(payload);
	};

	return {
		createAccess,
		data: data?.data.data,
		...rest,
	};
};
