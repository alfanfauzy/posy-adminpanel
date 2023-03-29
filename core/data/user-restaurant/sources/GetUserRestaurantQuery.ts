import {GetUserRestaurantFilterInput} from '@/domain/user-restaurant/repositories/UserRestaurantRepository';
import Post from 'api/post';
import {AxiosError} from 'axios';
import {useQuery, UseQueryOptions} from 'react-query';

import {Datalist, Response} from '../../../domain/vo/BaseResponse';
import {GetUserRestaurantResponse} from '../types';

export const GetUserRestaurant = async (
	input: GetUserRestaurantFilterInput,
): Promise<Response<Datalist<GetUserRestaurantResponse>>> => {
	try {
		const response = await Post({
			endpoint: `/api/fnb-user-service/internal/restaurant/user/get-list`,
			payload: input,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useGetUserRestaurantQuery = (
	input: any,
	options?: UseQueryOptions<Response<Datalist<GetUserRestaurantResponse>>>,
) =>
	useQuery<Response<Datalist<GetUserRestaurantResponse>>>(
		['restaurant/user/list', input],
		() => GetUserRestaurant(input),
		{
			enabled: !!JSON.stringify(input),
			...options,
		},
	);
