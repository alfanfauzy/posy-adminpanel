import {UpdateRestaurantParams} from '@/domain/restaurant/repositories/RestaurantRepository';
import Post from 'api/post';
import {AxiosError} from 'axios';
import {MutationOptions} from 'core/domain/vo/BaseMutation';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';
import {ErrorType} from 'types/index';

import {Response} from '../../../domain/vo/BaseResponse';
import {UpdateRestaurantResponse} from '../types';

export const UpdateRestaurantService = async (
	params: UpdateRestaurantParams,
): Promise<Response<UpdateRestaurantResponse>> => {
	const {id, payload} = params;
	try {
		const response = await Post({
			endpoint: `/api/fnb-user-service/internal/restaurant/update/${id}`,
			payload,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useUpdateRestaurantMutation = (
	options?: MutationOptions<UpdateRestaurantResponse>,
) =>
	useMutation({
		mutationFn: (payload: UpdateRestaurantParams) =>
			UpdateRestaurantService(payload),
		onError(error: ErrorType) {
			const textMessage = `${error.more_info} : ${error.message}`;
			toast.error(textMessage);
		},
		...options,
	});
