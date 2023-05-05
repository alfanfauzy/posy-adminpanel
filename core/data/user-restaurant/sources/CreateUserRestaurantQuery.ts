import {FormUserRestaurant} from '@/domain/user-restaurant/models';
import Post from 'api/post';
import {AxiosError} from 'axios';
import {MutationOptions} from 'core/domain/vo/BaseMutation';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';
import {ErrorType} from 'types/index';

import {Response} from '../../../domain/vo/BaseResponse';
import {CreateUserRestaurantResponse} from '../types';

export const CreateUserRestaurantService = async (
	payload: FormUserRestaurant,
): Promise<Response<CreateUserRestaurantResponse>> => {
	try {
		const response = await Post({
			endpoint: `/api/fnb-user-service/internal/restaurant/user/create`,
			payload,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useCreateUserRestaurantMutation = (
	options?: MutationOptions<CreateUserRestaurantResponse>,
) =>
	useMutation({
		mutationFn: (payload: FormUserRestaurant) =>
			CreateUserRestaurantService(payload),
		onError(error: ErrorType) {
			toast.error(error.more_info);
		},
		...options,
	});
