import {DeleteRestaurantInput} from '@/domain/restaurant/repositories/RestaurantRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

import {useDeleteRestaurantMutation} from '../sources/DeleteRestaurantMutation';
import {DeleteRestaurantResponse} from '../types';

export const useDeleteRestaurantUsecase = (
	options?: MutationOptions<DeleteRestaurantResponse>,
): any => {
	const {mutate, data, ...rest} = useDeleteRestaurantMutation(options);

	const deleteRestaurant = (payload: DeleteRestaurantInput) => {
		mutate(payload);
	};

	return {
		deleteRestaurant,
		data: data?.data.data,
		...rest,
	};
};
