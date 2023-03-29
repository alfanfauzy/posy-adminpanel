import {UpdateAdminResponse} from '@/data/admin/types';
import {useUpdateAdminUsecase} from '@/data/admin/usecases/UpdateAdminUsecase';
import {UpdateAdminRepository} from '@/domain/admin/repositories/AdminRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useUpdateAdminViewModal = (
	options?: MutationOptions<UpdateAdminResponse>,
): UpdateAdminRepository => {
	const result = useUpdateAdminUsecase(options);

	return result;
};
