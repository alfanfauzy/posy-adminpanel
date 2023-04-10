import {
	GetFilterRestaurantInput,
	GetRestaurantsResult,
} from '@/domain/restaurant/repositories/RestaurantRepository';
import {Datalist, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from 'react-query';

import {mapToRestaurantModel} from '../mappers/RestaurantMapper';
import {useGetRestaurantQuery} from '../sources/GetRestaurantQuery';
import {GetRestaurantListDataResponse} from '../types';

export const useGetRestaurantUsecase = (
	input?: GetFilterRestaurantInput,
	options?: UseQueryOptions<Response<Datalist<GetRestaurantListDataResponse>>>,
): GetRestaurantsResult => {
	const {data, ...rest} = useGetRestaurantQuery(input, options);

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
