import {Response} from '@/domain/vo/BaseResponse';
import Get from 'api/get';
import {UseQueryOptions, useQuery} from 'react-query';

import {GetTransactionDetailResponse} from '../types/GetTransactionDetailType';

export const GetTransactionDetailQueryKey = 'transactions/detail';

const GetTransactionDetail = async (
	transaction_uuid: string,
): Promise<Response<GetTransactionDetailResponse>> => {
	const response = await Get({
		endpoint: `/api/fnb-order-service/internal/transaction/get-detail/${transaction_uuid}`,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useGetTransactionDetailQuery = (
	transaction_uuid: string,
	options?: UseQueryOptions<Response<GetTransactionDetailResponse>>,
) =>
	useQuery<Response<GetTransactionDetailResponse>>(
		[GetTransactionDetailQueryKey, transaction_uuid],
		() => GetTransactionDetail(transaction_uuid),
		{
			refetchOnWindowFocus: false,
			...options,
		},
	);
