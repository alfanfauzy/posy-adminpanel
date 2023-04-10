import {DeleteRestaurantInput} from '@/domain/restaurant/repositories/RestaurantRepository';
import Post from 'api/post';
import {AxiosError} from 'axios';
import {MutationOptions} from 'core/domain/vo/BaseMutation';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';
import {ErrorType} from 'types/index';

import {Response} from '../../../domain/vo/BaseResponse';
import {DeleteRestaurantResponse} from '../types';

export const DeleteRestaurantService = async (
	uuid: DeleteRestaurantInput,
): Promise<Response<DeleteRestaurantResponse>> => {
	try {
		const response = await Post({
			endpoint: `/api/fnb-user-service/internal/restaurant/delete/${uuid}`,
			payload: {},
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useDeleteRestaurantMutation = (
	options?: MutationOptions<DeleteRestaurantResponse>,
) =>
	useMutation({
		mutationFn: (payload: DeleteRestaurantInput) =>
			DeleteRestaurantService(payload),
		onError(error: ErrorType) {
			const textMessage = `${error.more_info} : ${error.message}`;
			toast.error(textMessage);
		},
		...options,
	});
