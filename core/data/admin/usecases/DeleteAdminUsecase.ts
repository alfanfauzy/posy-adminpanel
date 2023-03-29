import {DeleteAdminInput} from '@/domain/admin/repositories/AdminRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

import {useDeleteAdminMutation} from '../sources/DeleteAdminQuery';
import {DeleteAdminResponse} from '../types';

export const useDeleteAdminUsecase = (
	options?: MutationOptions<DeleteAdminResponse>,
): any => {
	const {mutate, data, ...rest} = useDeleteAdminMutation(options);

	const deleteAdmin = (payload: DeleteAdminInput) => {
		mutate(payload);
	};

	return {
		deleteAdmin,
		data: data?.data.data,
		...rest,
	};
};
