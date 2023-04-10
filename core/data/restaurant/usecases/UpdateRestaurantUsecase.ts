import {UpdateRestaurantParams} from '@/domain/restaurant/repositories/RestaurantRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

import {useUpdateRestaurantMutation} from '../sources/UpdateRestaurantMutation';
import {UpdateRestaurantResponse} from '../types';

export const useUpdateRestaurantUsecase = (
	options?: MutationOptions<UpdateRestaurantResponse>,
): any => {
	const {mutate, data, ...rest} = useUpdateRestaurantMutation(options);

	const updateRestaurant = (params: UpdateRestaurantParams) => {
		mutate(params);
	};

	return {
		updateRestaurant,
		data: data?.data.data,
		...rest,
	};
};
