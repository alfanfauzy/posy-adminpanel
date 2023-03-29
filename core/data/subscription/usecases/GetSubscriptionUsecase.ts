import {
	GetSubscriptionFilterInput,
	GetSubscriptionsResult,
} from '@/domain/subscription/repositories/SubscriptionRepository';

import {mapToSubscriptionModel} from '../mappers/SubscriptionMapper';
import {useGetSubscriptionQuery} from '../sources/GetSubscriptionQuery';

export const useGetSubscriptionUsecase = (
	input?: GetSubscriptionFilterInput,
): GetSubscriptionsResult => {
	const {data, ...rest} = useGetSubscriptionQuery(input);

	if (data?.data.objs) {
		const subscriptionMapper = mapToSubscriptionModel(data.data.objs);

		return {
			data: subscriptionMapper,
			pagination: {
				curr_page: data.data.curr_page,
				per_page: data.data.per_page,
				total_objs: data.data.total_objs,
				total_page: data.data.total_page,
			},
			...rest,
		};
	}

	return {
		data: undefined,
		pagination: undefined,
		...rest,
	};
};
