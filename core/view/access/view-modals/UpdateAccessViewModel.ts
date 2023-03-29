import {UpdateAccessResponse} from '@/data/access/types';
import {useUpdateAccessUsecase} from '@/data/access/usecases/UpdateAccessUsecase';
import {UpdateAccessRepository} from '@/domain/access/repositories/AccessRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useUpdateAccessViewModal = (
	options?: MutationOptions<UpdateAccessResponse>,
): UpdateAccessRepository => {
	const result = useUpdateAccessUsecase(options);

	return result;
};
