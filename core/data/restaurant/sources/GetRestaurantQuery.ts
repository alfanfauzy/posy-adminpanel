import {GetFilterRestaurantInput} from '@/domain/restaurant/repositories/RestaurantRepository';
import Post from 'api/post';
import {AxiosError} from 'axios';
import {useQuery, UseQueryOptions} from 'react-query';

import {Datalist, Response} from '../../../domain/vo/BaseResponse';
import {GetRestaurantListDataResponse} from '../types';

export const GetRestaurant = async (
	input?: GetFilterRestaurantInput,
): Promise<Response<Datalist<GetRestaurantListDataResponse>>> => {
	try {
		const response = await Post({
			endpoint: `/api/fnb-user-service/internal/restaurant/get-list`,
			payload: input,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useGetRestaurantQuery = (
	input?: GetFilterRestaurantInput,
	options?: UseQueryOptions<Response<Datalist<GetRestaurantListDataResponse>>>,
) =>
	useQuery<Response<Datalist<GetRestaurantListDataResponse>>>(
		['restaurant/list', JSON.stringify(input)],
		() => GetRestaurant(input),
		{
			enabled: !!JSON.stringify(input),
			...options,
		},
	);
