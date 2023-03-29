import {DeleteAccessResponse} from '@/data/access/types';
import {useDeleteAccessUsecase} from '@/data/access/usecases/DeleteAccessUsecase';
import {DeleteAccessRepository} from '@/domain/access/repositories/AccessRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useDeleteAccessViewModal = (
	options?: MutationOptions<DeleteAccessResponse>,
): DeleteAccessRepository => {
	const result = useDeleteAccessUsecase(options);

	return result;
};
