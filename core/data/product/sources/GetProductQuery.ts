import {GetFilterProductInput} from '@/domain/product/repositories/ProductRepository';
import Post from 'api/post';
import {AxiosError} from 'axios';
import {useQuery, UseQueryOptions} from 'react-query';

import {Datalist, Response} from '../../../domain/vo/BaseResponse';
import {GetListProductDataResponse} from '../types';

export const GetProduct = async (
	input: GetFilterProductInput,
): Promise<Response<Datalist<GetListProductDataResponse>>> => {
	const {restaurant_uuid, limit, page, search, sort} = input;
	const payload = {limit, page, search, sort};

	try {
		const response = await Post({
			endpoint: `/api/fnb-product-service/internal/product/get-list/${restaurant_uuid}`,
			payload,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useGetProductQuery = (
	input: GetFilterProductInput,
	options?: UseQueryOptions<Response<Datalist<GetListProductDataResponse>>>,
) =>
	useQuery<Response<Datalist<GetListProductDataResponse>>>(
		['product/list', JSON.stringify(input)],
		() => GetProduct(input),
		{
			enabled: !!JSON.stringify(input),
			...options,
		},
	);
