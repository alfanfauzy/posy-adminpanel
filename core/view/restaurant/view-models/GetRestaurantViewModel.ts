import {GetRestaurantListDataResponse} from '@/data/restaurant/types';
import {useGetRestaurantUsecase} from '@/data/restaurant/usecases/GetRestaurantUsecase';
import {
	GetFilterRestaurantInput,
	GetRestaurantsResult,
} from '@/domain/restaurant/repositories/RestaurantRepository';
import {Datalist, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from 'react-query';

export const useGetRestaurantViewModal = (
	input?: GetFilterRestaurantInput,
	options?: UseQueryOptions<Response<Datalist<GetRestaurantListDataResponse>>>,
): GetRestaurantsResult => {
	const result = useGetRestaurantUsecase(input, options);

	return result;
};
