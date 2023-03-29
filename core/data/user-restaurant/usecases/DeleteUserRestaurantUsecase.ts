import {DeleteUserRestaurantParams} from '@/domain/user-restaurant/repositories/UserRestaurantRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

import {useDeleteUserRestaurantMutation} from '../sources/DeleteUserRestaurantQuery';
import {DeleteUserRestaurantResponse} from '../types';

export const useDeleteUserRestaurantUsecase = (
	options?: MutationOptions<DeleteUserRestaurantResponse>,
): any => {
	const {mutate, data, ...rest} = useDeleteUserRestaurantMutation(options);

	const deleteUserRestaurant = (payload: DeleteUserRestaurantParams) => {
		mutate(payload);
	};

	return {
		deleteUserRestaurant,
		data: data?.data.data,
		...rest,
	};
};
