import {
	GetUserRestaurantFilterInput,
	GetUserRestaurantsResult,
} from '@/domain/user-restaurant/repositories/UserRestaurantRepository';

import {mapToUserRestaurantModel} from '../mappers/UserRestaurantMapper';
import {useGetUserRestaurantQuery} from '../sources/GetUserRestaurantQuery';

export const useGetUserRestaurantUsecase = (
	input?: GetUserRestaurantFilterInput,
): GetUserRestaurantsResult => {
	const {data, ...rest} = useGetUserRestaurantQuery(input);

	if (data?.data.objs) {
		const userRestaurantMapper = mapToUserRestaurantModel(data.data.objs);

		return {
			data: userRestaurantMapper,
			pagination: {
				curr_page: data.data.curr_page,
				per_page: data.data.per_page,
				total_objs: data.data.total_objs,
				total_page: data.data.total_page,
			},
			...rest,
		};
	}

	return {
		data: undefined,
		pagination: undefined,
		...rest,
	};
};
