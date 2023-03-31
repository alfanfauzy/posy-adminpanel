import {FormUserSubscriptionRenew} from '@/domain/user-subscription/models';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

import {useCreateUserSubscriptionMutation} from '../sources/CreateUserSubscriptionQuery';
import {CreateUserSubscriptionResponse} from '../types';

export const useCreateUserSubscriptionUsecase = (
	options: MutationOptions<CreateUserSubscriptionResponse>,
): any => {
	const {mutate, data, ...rest} = useCreateUserSubscriptionMutation(options);

	const createUserSubscriptionRenew = (payload: FormUserSubscriptionRenew) => {
		mutate(payload);
	};

	return {
		createUserSubscriptionRenew,
		data: data?.data.data,
		...rest,
	};
};
