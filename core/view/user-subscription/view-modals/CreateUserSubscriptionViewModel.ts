import {CreateUserSubscriptionResponse} from '@/data/user-subscription/types';
import {useCreateUserSubscriptionUsecase} from '@/data/user-subscription/usecases/CreateSubscriptionUsecase';
import {CreateUserSubscriptionRepository} from '@/domain/user-subscription/repositories/UserSubscriptionRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useCreateUserSubscriptionViewModal = (
	options: MutationOptions<CreateUserSubscriptionResponse>,
): CreateUserSubscriptionRepository => {
	const result = useCreateUserSubscriptionUsecase(options);

	return result;
};
