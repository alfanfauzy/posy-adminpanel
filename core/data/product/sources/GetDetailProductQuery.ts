import Post from 'api/post';
import {AxiosError} from 'axios';
import {useQuery, UseQueryOptions} from 'react-query';

import {Response} from '../../../domain/vo/BaseResponse';
import {GetDetailProductResponse} from '../types';

export const GetDetailProduct = async (
	product_uuid: string,
): Promise<Response<GetDetailProductResponse>> => {
	try {
		const response = await Post({
			endpoint: `/api/fnb-product-service/internal/product/get-detail/${product_uuid}`,
			payload: {},
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useGetDetailProductQuery = (
	input: string,
	options?: UseQueryOptions<Response<GetDetailProductResponse>>,
) =>
	useQuery<Response<GetDetailProductResponse>>(
		['product/detail', JSON.stringify(input)],
		() => GetDetailProduct(input),
		{
			enabled: !!JSON.stringify(input),
			...options,
		},
	);
