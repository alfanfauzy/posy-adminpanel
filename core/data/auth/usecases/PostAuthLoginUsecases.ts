import {PostLoginPayload} from '@/domain/auth/models';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

import {useLoginMutation} from '../sources/PostAuthLogin';
import {LoginResponse} from '../types';

export const useLoginUsecase = (
	options?: MutationOptions<LoginResponse>,
): any => {
	const {mutate, data, ...rest} = useLoginMutation(options);

	const loginPost = (payload: PostLoginPayload) => {
		mutate(payload);
	};

	return {
		loginPost,
		data: data?.data,
		...rest,
	};
};
