import {FormSubscription} from '@/domain/subscription/models';
import Post from 'api/post';
import {AxiosError} from 'axios';
import {MutationOptions} from 'core/domain/vo/BaseMutation';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';
import {ErrorType} from 'types/index';

import {Response} from '../../../domain/vo/BaseResponse';
import {CreateSubscriptionResponse} from '../types';

export const CreateSubscriptionService = async (
	payload: FormSubscription,
): Promise<Response<CreateSubscriptionResponse>> => {
	try {
		const response = await Post({
			endpoint: `/api/fnb-user-service/internal/subscription/create`,
			payload,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useCreateSubscriptionMutation = (
	options: MutationOptions<CreateSubscriptionResponse>,
) =>
	useMutation({
		mutationFn: (payload: FormSubscription) =>
			CreateSubscriptionService(payload),
		onError(error: ErrorType) {
			toast.error(error.message);
		},
		...options,
	});
