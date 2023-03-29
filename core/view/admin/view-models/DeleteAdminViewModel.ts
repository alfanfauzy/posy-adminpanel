import {DeleteAdminResponse} from '@/data/admin/types';
import {useDeleteAdminUsecase} from '@/data/admin/usecases/DeleteAdminUsecase';
import {DeleteAdminRepository} from '@/domain/admin/repositories/AdminRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useDeleteAdminViewModal = (
	options?: MutationOptions<DeleteAdminResponse>,
): DeleteAdminRepository => {
	const result = useDeleteAdminUsecase(options);

	return result;
};
