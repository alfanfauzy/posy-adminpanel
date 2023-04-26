import {LogoutResponse} from '@/data/auth/types';
import {useLogoutUsecase} from '@/data/auth/usecases/LogoutUsecases';
import {PostLogoutRepository} from '@/domain/auth/repositories/AuthRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useLogoutViewModal = (
	options: MutationOptions<LogoutResponse>,
): PostLogoutRepository => {
	const result = useLogoutUsecase(options);

	return result;
};
