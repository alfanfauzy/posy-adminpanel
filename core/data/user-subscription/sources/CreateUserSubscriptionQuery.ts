import {FormUserSubscriptionRenew} from '@/domain/user-subscription/models';
import Post from 'api/post';
import {AxiosError} from 'axios';
import {MutationOptions} from 'core/domain/vo/BaseMutation';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';
import {ErrorType} from 'types/index';

import {Response} from '../../../domain/vo/BaseResponse';
import {CreateUserSubscriptionResponse} from '../types';

export const CreateUserSubscriptionService = async (
	payload: FormUserSubscriptionRenew,
): Promise<Response<CreateUserSubscriptionResponse>> => {
	try {
		const response = await Post({
			endpoint: `/api/fnb-user-service/internal/subscription/renew`,
			payload,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useCreateUserSubscriptionMutation = (
	options: MutationOptions<CreateUserSubscriptionResponse>,
) =>
	useMutation({
		mutationFn: (payload: FormUserSubscriptionRenew) =>
			CreateUserSubscriptionService(payload),
		onError(error: ErrorType) {
			toast.error(error.message);
		},
		...options,
	});
