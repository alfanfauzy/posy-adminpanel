import {FormBodyPayload} from '@/domain/restaurant/models';
import Post from 'api/post';
import {AxiosError} from 'axios';
import {MutationOptions} from 'core/domain/vo/BaseMutation';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';
import {ErrorType} from 'types/index';

import {Response} from '../../../domain/vo/BaseResponse';
import {CreateRestaurantResponse} from '../types';

export const CreateRestaurantService = async (
	payload: FormBodyPayload,
): Promise<Response<CreateRestaurantResponse>> => {
	try {
		const response = await Post({
			endpoint: `/api/fnb-user-service/internal/restaurant/create`,
			payload,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useCreateRestaurantMutation = (
	options?: MutationOptions<CreateRestaurantResponse>,
) =>
	useMutation({
		mutationFn: (payload: FormBodyPayload) => CreateRestaurantService(payload),
		onError(error: ErrorType) {
			const textMessage = `${error.more_info} : ${error.message}`;
			toast.error(textMessage);
		},
		...options,
	});
