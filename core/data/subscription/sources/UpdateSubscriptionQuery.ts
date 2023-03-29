import {UpdateSubscriptionParams} from '@/domain/subscription/repositories/SubscriptionRepository';
import Post from 'api/post';
import {AxiosError} from 'axios';
import {MutationOptions} from 'core/domain/vo/BaseMutation';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';
import {ErrorType} from 'types/index';

import {Response} from '../../../domain/vo/BaseResponse';
import {UpdateSubscriptionResponse} from '../types';

export const UpdateSubscriptionService = async (
	params: UpdateSubscriptionParams,
): Promise<Response<UpdateSubscriptionResponse>> => {
	const {id, payload} = params;
	try {
		const response = await Post({
			endpoint: `/api/fnb-user-service/internal/subscription/update/${id}`,
			payload,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useUpdateSubscriptionMutation = (
	options?: MutationOptions<UpdateSubscriptionResponse>,
) =>
	useMutation({
		mutationFn: (params: UpdateSubscriptionParams) =>
			UpdateSubscriptionService(params),
		onError(error: ErrorType) {
			toast.error(error.message);
		},
		...options,
	});
