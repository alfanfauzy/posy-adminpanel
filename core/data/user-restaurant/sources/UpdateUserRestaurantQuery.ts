import {UpdateUserRestaurantParams} from '@/domain/user-restaurant/repositories/UserRestaurantRepository';
import Post from 'api/post';
import {AxiosError} from 'axios';
import {MutationOptions} from 'core/domain/vo/BaseMutation';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';
import {ErrorType} from 'types/index';

import {Response} from '../../../domain/vo/BaseResponse';
import {UpdateUserRestaurantResponse} from '../types';

export const UpdateUserRestaurantService = async (
	params: UpdateUserRestaurantParams,
): Promise<Response<UpdateUserRestaurantResponse>> => {
	const {id, payload} = params;
	try {
		const response = await Post({
			endpoint: `/api/fnb-user-service/internal/restaurant/user/update/${id}`,
			payload,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useUpdateUserRestaurantMutation = (
	options?: MutationOptions<UpdateUserRestaurantResponse>,
) =>
	useMutation({
		mutationFn: (params: UpdateUserRestaurantParams) =>
			UpdateUserRestaurantService(params),
		onError(error: ErrorType) {
			if (typeof error.message === 'object') {
				const keys = Object.keys(error.message);
				if (keys.includes('password')) {
					toast.error(
						'Password must be at least 8 Characters, 1 Uppercase and 1 Lowercase',
					);
				}
			} else {
				toast.error(error.message);
			}
		},
		...options,
	});
