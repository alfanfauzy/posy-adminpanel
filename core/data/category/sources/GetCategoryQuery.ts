import {GetFilterCategoryInput} from '@/domain/category/repositories/CategoryRepository';
import Post from 'api/post';
import {AxiosError} from 'axios';
import {useQuery, UseQueryOptions} from 'react-query';

import {Datalist, Response} from '../../../domain/vo/BaseResponse';
import {GetCategoryListDataResponse} from '../types';

export const GetCategory = async (
	input: GetFilterCategoryInput,
): Promise<Response<Datalist<GetCategoryListDataResponse>>> => {
	const {limit, page, search, sort, restaurant_uuid} = input;
	const payload = {limit, page, search, sort};
	try {
		const response = await Post({
			endpoint: `/api/fnb-product-service/internal/category/get-list/${restaurant_uuid}`,
			payload,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useGetCategoryQuery = (
	input: GetFilterCategoryInput,
	options?: UseQueryOptions<Response<Datalist<GetCategoryListDataResponse>>>,
) =>
	useQuery<Response<Datalist<GetCategoryListDataResponse>>>(
		['Category/list', JSON.stringify(input)],
		() => GetCategory(input),
		{
			enabled: !!JSON.stringify(input),
			...options,
		},
	);
