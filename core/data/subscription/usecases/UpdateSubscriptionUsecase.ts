import {UpdateSubscriptionParams} from '@/domain/subscription/repositories/SubscriptionRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

import {useUpdateSubscriptionMutation} from '../sources/UpdateSubscriptionQuery';
import {UpdateSubscriptionResponse} from '../types';

export const useUpdateSubscriptionUsecase = (
	options?: MutationOptions<UpdateSubscriptionResponse>,
): any => {
	const {mutate, data, ...rest} = useUpdateSubscriptionMutation(options);

	const updateSubscription = (payload: UpdateSubscriptionParams) => {
		mutate(payload);
	};

	return {
		updateSubscription,
		data: data?.data.data,
		...rest,
	};
};
