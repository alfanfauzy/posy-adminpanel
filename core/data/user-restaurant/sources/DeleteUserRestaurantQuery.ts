import {DeleteUserRestaurantParams} from '@/domain/user-restaurant/repositories/UserRestaurantRepository';
import Post from 'api/post';
import {AxiosError} from 'axios';
import {MutationOptions} from 'core/domain/vo/BaseMutation';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';
import {ErrorType} from 'types/index';

import {Response} from '../../../domain/vo/BaseResponse';
import {DeleteUserRestaurantResponse} from '../types';

export const DeleteUserRestaurantService = async (
	uuid: DeleteUserRestaurantParams,
): Promise<Response<DeleteUserRestaurantResponse>> => {
	try {
		const response = await Post({
			endpoint: `/api/fnb-user-service/internal/restaurant/user/delete/${uuid}`,
			payload: {},
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useDeleteUserRestaurantMutation = (
	options?: MutationOptions<DeleteUserRestaurantResponse>,
) =>
	useMutation({
		mutationFn: (payload: DeleteUserRestaurantParams) =>
			DeleteUserRestaurantService(payload),
		onError(error: ErrorType) {
			toast.error(error.message);
		},
		...options,
	});
