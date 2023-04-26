import {LogoutPayload} from '@/domain/auth/models';
import Post from 'api/post';
import {AxiosError} from 'axios';
import {MutationOptions} from 'core/domain/vo/BaseMutation';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';
import {ErrorType} from 'types/index';

import {Response} from '../../../domain/vo/BaseResponse';
import {LogoutResponse} from '../types';

export const Logout = async (
	payload: LogoutPayload,
): Promise<Response<LogoutResponse>> => {
	try {
		const response = await Post({
			endpoint: `/api/fnb-user-service/v1/user/logout`,
			payload,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useLogoutMutation = (options: MutationOptions<LogoutResponse>) =>
	useMutation({
		mutationFn: (payload: LogoutPayload) => Logout(payload),
		onError(error: ErrorType) {
			const textMessage = `${error.message} : ${error.more_info}`;
			toast.error(textMessage);
		},
		...options,
	});
