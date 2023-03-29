import {
	GetFilterRestaurantInput,
	GetRestaurantsResult,
} from '@/domain/restaurant/repositories/RestaurantRepository';

import {mapToRestaurantModel} from '../mappers/RestaurantMapper';
import {useGetRestaurantQuery} from '../sources/GetRestaurantQuery';

export const useGetRestaurantUsecase = (
	input?: GetFilterRestaurantInput,
): GetRestaurantsResult => {
	const {data, ...rest} = useGetRestaurantQuery(input);

	if (data?.data.objs) {
		const restaurantMapper = mapToRestaurantModel(data.data.objs);

		return {
			data: restaurantMapper,
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
