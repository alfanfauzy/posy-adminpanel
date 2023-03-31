import {
	GetUserSubscriptionFilterInput,
	GetUserSubscriptionsResult,
} from '@/domain/user-subscription/repositories/UserSubscriptionRepository';

import {mapToUserSubscriptionModel} from '../mappers/UserSubscriptionMapper';
import {useGetUserSubscriptionQuery} from '../sources/GetUserSubscriptionQuery';

export const useGetUserSubscriptionUsecase = (
	input: GetUserSubscriptionFilterInput,
): GetUserSubscriptionsResult => {
	const {data, ...rest} = useGetUserSubscriptionQuery(input);

	if (data?.data.objs) {
		const userSubscriptionMapper = mapToUserSubscriptionModel(data.data.objs);

		return {
			data: userSubscriptionMapper,
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
