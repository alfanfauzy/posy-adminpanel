import {UpdateSubscriptionResponse} from '@/data/subscription/types';
import {useUpdateSubscriptionUsecase} from '@/data/subscription/usecases/UpdateSubscriptionUsecase';
import {UpdateSubscriptionRepository} from '@/domain/subscription/repositories/SubscriptionRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useUpdateSubscriptionViewModal = (
	options?: MutationOptions<UpdateSubscriptionResponse>,
): UpdateSubscriptionRepository => {
	const result = useUpdateSubscriptionUsecase(options);

	return result;
};
