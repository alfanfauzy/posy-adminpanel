import {GetPaymentReportDetailPayload} from '@/domain/payment/repositories/GetPaymentReportDetail';
import {Response} from '@/domain/vo/BaseResponse';
import Get from 'api/get';
import {AxiosError} from 'axios';
import {useQuery, UseQueryOptions} from 'react-query';

import {GetPaymentReportDetailResponse} from '../types/GetPaymentReportDetailType';

export const GetPaymentReportDetailQueryKey = 'payment-report/detail';

export const GetPaymentReportDetail = async (
	payload: GetPaymentReportDetailPayload,
): Promise<Response<GetPaymentReportDetailResponse>> => {
	const {restaurant_uuid, transaction_id} = payload;
	try {
		const response = await Get({
			endpoint: `/api/fnb-payment-service/internal/payment/transaction/${transaction_id}`,
			params: {restaurant_uuid},
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useGetPaymentReportDetailQuery = (
	payload: GetPaymentReportDetailPayload,
	options?: UseQueryOptions<Response<GetPaymentReportDetailResponse>>,
) =>
	useQuery<Response<GetPaymentReportDetailResponse>>(
		[GetPaymentReportDetailQueryKey, JSON.stringify(payload)],
		() => GetPaymentReportDetail(payload),
		{
			enabled: !!JSON.stringify(payload),
			...options,
		},
	);
