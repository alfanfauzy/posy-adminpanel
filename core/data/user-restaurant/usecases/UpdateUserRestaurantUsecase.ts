import {UpdateUserRestaurantParams} from '@/domain/user-restaurant/repositories/UserRestaurantRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

import {useUpdateUserRestaurantMutation} from '../sources/UpdateUserRestaurantQuery';
import {UpdateUserRestaurantResponse} from '../types';

export const useUpdateUserRestaurantUsecase = (
	options?: MutationOptions<UpdateUserRestaurantResponse>,
): any => {
	const {mutate, data, ...rest} = useUpdateUserRestaurantMutation(options);

	const updateUserRestaurant = (payload: UpdateUserRestaurantParams) => {
		mutate(payload);
	};

	return {
		updateUserRestaurant,
		data: data?.data.data,
		...rest,
	};
};
