import {FormBodyPayload} from '@/domain/restaurant/models';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

import {useCreateRestaurantMutation} from '../sources/CreateRestaurantQuery';
import {CreateRestaurantResponse} from '../types';

export const useCreateRestaurantUsecase = (
	options?: MutationOptions<CreateRestaurantResponse>,
): any => {
	const {mutate, data, ...rest} = useCreateRestaurantMutation(options);

	const createRestaurant = (payload: FormBodyPayload) => {
		mutate(payload);
	};

	return {
		createRestaurant,
		data: data?.data.data,
		...rest,
	};
};
