import {DeleteSubscriptionResponse} from '@/data/subscription/types';
import {useDeleteSubscriptionUsecase} from '@/data/subscription/usecases/DeleteSubscriptionUsecase';
import {DeleteSubscriptionRepository} from '@/domain/subscription/repositories/SubscriptionRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useDeleteSubscriptionViewModal = (
	options?: MutationOptions<DeleteSubscriptionResponse>,
): DeleteSubscriptionRepository => {
	const result = useDeleteSubscriptionUsecase(options);

	return result;
};
