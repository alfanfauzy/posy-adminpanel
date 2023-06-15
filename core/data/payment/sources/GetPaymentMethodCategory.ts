import {GetFilterPaymentMethodCategory} from '@/domain/payment/repositories/PaymentRepositories';
import {Datalist, Response} from '@/domain/vo/BaseResponse';
import Post from 'api/post';
import {AxiosError} from 'axios';
import {useQuery, UseQueryOptions} from 'react-query';

import {GetPaymentMethodCategoryListResponse} from '../types/index';

export const GetPaymentMethodCategory = async (
	input?: GetFilterPaymentMethodCategory,
): Promise<Response<Datalist<GetPaymentMethodCategoryListResponse>>> => {
	try {
		const response = await Post({
			endpoint: `/api/fnb-order-service/internal/payment/method-category/get-list`,
			payload: input,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useGetPaymentMethodCategoryQuery = (
	input?: GetFilterPaymentMethodCategory,
	options?: UseQueryOptions<
		Response<Datalist<GetPaymentMethodCategoryListResponse>>
	>,
) =>
	useQuery<Response<Datalist<GetPaymentMethodCategoryListResponse>>>(
		['payment-method-category/list', JSON.stringify(input)],
		() => GetPaymentMethodCategory(input),
		{
			enabled: !!JSON.stringify(input),
			...options,
		},
	);
