import {GetPaymentSummaryInput} from '@/domain/transaction/repositories/GetPaymentSummaryRepository';
import {Response} from '@/domain/vo/BaseResponse';
import Post from 'api/post';
import {UseQueryOptions, useQuery} from 'react-query';

import {GetPaymentSummaryDataResponse} from '../types/GetPaymentSummaryType';

export const GetPaymentSummaryQueryKey =
	'transactions/payment-summary' as const;

const GetPaymentSummary = async (
	input: GetPaymentSummaryInput,
): Promise<Response<GetPaymentSummaryDataResponse>> => {
	const {payload, transaction_uuid} = input;

	const response = await Post({
		endpoint: `/api/fnb-order-service/internal/transaction/payment/summary/${transaction_uuid}`,
		payload: payload,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useGetPaymentSummaryQuery = (
	input: GetPaymentSummaryInput,
	options?: UseQueryOptions<Response<GetPaymentSummaryDataResponse>>,
) =>
	useQuery<Response<GetPaymentSummaryDataResponse>>(
		[GetPaymentSummaryQueryKey, input],
		() => GetPaymentSummary(input),
		{
			refetchOnWindowFocus: false,
			...options,
		},
	);
