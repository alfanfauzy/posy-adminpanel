import {LoginResponse} from '@/data/auth/types';
import {useLoginUsecase} from '@/data/auth/usecases/PostAuthLoginUsecases';
import {PostLoginRepository} from '@/domain/auth/repositories/AuthRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useLoginViewModal = (
	options: MutationOptions<LoginResponse>,
): PostLoginRepository => {
	const result = useLoginUsecase(options);

	return result;
};
