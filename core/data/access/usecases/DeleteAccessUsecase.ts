import {DeleteAccessParams} from '@/domain/access/repositories/AccessRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

import {useDeleteAccessMutation} from '../sources/DeleteAccessQuery';
import {DeleteAccessResponse} from '../types';

export const useDeleteAccessUsecase = (
	options?: MutationOptions<DeleteAccessResponse>,
): any => {
	const {mutate, data, ...rest} = useDeleteAccessMutation(options);

	const deleteAccess = (payload: DeleteAccessParams) => {
		mutate(payload);
	};

	return {
		deleteAccess,
		data: data?.data.data,
		...rest,
	};
};
