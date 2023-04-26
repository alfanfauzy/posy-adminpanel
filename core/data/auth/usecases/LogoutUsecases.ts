import {LogoutPayload} from '@/domain/auth/models';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

import {useLogoutMutation} from '../sources/MutationLogout';
import {LogoutResponse} from '../types';

export const useLogoutUsecase = (
	options: MutationOptions<LogoutResponse>,
): any => {
	const {mutate, data, ...rest} = useLogoutMutation(options);

	const logout = (payload: LogoutPayload) => {
		mutate(payload);
	};

	return {
		logout,
		data: data?.data,
		...rest,
	};
};
