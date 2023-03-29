import {CreateAccessResponse} from '@/data/access/types';
import {useCreateAccessUsecase} from '@/data/access/usecases/CreateAccessUsecase';
import {CreateAccessRepository} from '@/domain/access/repositories/AccessRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useCreateAccessViewModal = (
	options: MutationOptions<CreateAccessResponse>,
): CreateAccessRepository => {
	const result = useCreateAccessUsecase(options);

	return result;
};
