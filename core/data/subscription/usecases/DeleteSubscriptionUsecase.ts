import {DeleteSubscriptionParams} from '@/domain/subscription/repositories/SubscriptionRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

import {useDeleteSubscriptionMutation} from '../sources/DeleteSubscriptionQuery';
import {DeleteSubscriptionResponse} from '../types';

export const useDeleteSubscriptionUsecase = (
	options?: MutationOptions<DeleteSubscriptionResponse>,
): any => {
	const {mutate, data, ...rest} = useDeleteSubscriptionMutation(options);

	const deleteSubscription = (payload: DeleteSubscriptionParams) => {
		mutate(payload);
	};

	return {
		deleteSubscription,
		data: data?.data.data,
		...rest,
	};
};
