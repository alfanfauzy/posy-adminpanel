import {GetOrdersInput} from '@/domain/order/repositories/GetOrdersRepository';
import {Datalist, Response} from '@/domain/vo/BaseResponse';
import Get from 'api/get';
import {UseQueryOptions, useQuery} from 'react-query';

import {GetOrdersDataResponse} from '../types';

export const GetOrdersQueryKey = 'Orders/list' as const;

const GetOrders = async (
	input: GetOrdersInput,
): Promise<Response<Datalist<GetOrdersDataResponse>>> => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const {transaction_uuid, ...params} = input;
	const response = await Get({
		endpoint: `/api/fnb-order-service/internal/order/get-list/${input.transaction_uuid}`,
		params,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useGetOrdersQuery = (
	input: GetOrdersInput,
	options?: UseQueryOptions<Response<Datalist<GetOrdersDataResponse>>>,
) =>
	useQuery<Response<Datalist<GetOrdersDataResponse>>>(
		[GetOrdersQueryKey, input],
		() => GetOrders(input),
		{
			refetchOnWindowFocus: false,
			...options,
		},
	);
