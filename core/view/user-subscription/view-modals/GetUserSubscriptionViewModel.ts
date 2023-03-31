import {useGetUserSubscriptionUsecase} from '@/data/user-subscription/usecases/GetUserSubscriptionUsecase';
import {
	GetUserSubscriptionFilterInput,
	GetUserSubscriptionsResult,
} from '@/domain/user-subscription/repositories/UserSubscriptionRepository';

export const useGetUserSubscriptionViewModal = (
	input: GetUserSubscriptionFilterInput,
): GetUserSubscriptionsResult => {
	const result = useGetUserSubscriptionUsecase(input);

	return result;
};
