import {useGetSubscriptionUsecase} from '@/data/subscription/usecases/GetSubscriptionUsecase';
import {
	GetSubscriptionFilterInput,
	GetSubscriptionsResult,
} from '@/domain/subscription/repositories/SubscriptionRepository';

export const useGetSubscriptionViewModal = (
	input?: GetSubscriptionFilterInput,
): GetSubscriptionsResult => {
	const result = useGetSubscriptionUsecase(input);

	return result;
};
