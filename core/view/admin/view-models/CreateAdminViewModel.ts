import {CreateAdminResponse} from '@/data/admin/types';
import {useCreateAdminUsecase} from '@/data/admin/usecases/CreateAdminUsecase';
import {CreateAdminRepository} from '@/domain/admin/repositories/AdminRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useCreateAdminViewModal = (
	options?: MutationOptions<CreateAdminResponse>,
): CreateAdminRepository => {
	const result = useCreateAdminUsecase(options);

	return result;
};
