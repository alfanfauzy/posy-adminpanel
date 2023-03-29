import {CreateSubscriptionResponse} from '@/data/subscription/types';
import {useCreateSubscriptionUsecase} from '@/data/subscription/usecases/CreateSubscriptionUsecase';
import {CreateSubscriptionRepository} from '@/domain/subscription/repositories/SubscriptionRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useCreateSubscriptionViewModal = (
	options: MutationOptions<CreateSubscriptionResponse>,
): CreateSubscriptionRepository => {
	const result = useCreateSubscriptionUsecase(options);

	return result;
};
