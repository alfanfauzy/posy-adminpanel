import {GetPaymentReportFilter} from '@/domain/payment/repositories/GetPaymentReportList';
import {Response} from '@/domain/vo/BaseResponse';
import axios, {AxiosError, AxiosResponse} from 'axios';
import {useInfiniteQuery, UseInfiniteQueryOptions} from 'react-query';
import {store} from 'store/index';

import {GetPaymentReportListResponse} from '../types';

export const GetPaymentReportKey = 'payment-report/list';

export const GetPaymentReport = async (
	payload: GetPaymentReportFilter,
): Promise<Response<GetPaymentReportListResponse>> => {
	const {
		end_date,
		restaurant_uuid,
		start_date,
		after_id,
		before_id,
		channel_categories,
		limit,
		statuses,
		types,
	} = payload;

	const newPayload = {
		end_date,
		restaurant_uuid,
		start_date,
		after_id,
		before_id,
		channel_categories,
		limit,
		statuses,
		types,
	};
	const {token} = store.getState().auth.authData;
	try {
		const response: AxiosResponse<Response<GetPaymentReportListResponse>> =
			await axios.get(`/api/fnb-payment-service/internal/payment/transaction`, {
				params: newPayload,
				headers: {token},
			});

		return {
			code: response.status,
			message: response.statusText,
			more_info: response.data.more_info,
			data: response.data.data,
		};
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useGetPaymentReportQuery = (
	payload: GetPaymentReportFilter,
	options?: UseInfiniteQueryOptions<Response<GetPaymentReportListResponse>>,
) =>
	useInfiniteQuery<Response<GetPaymentReportListResponse>>(
		[GetPaymentReportKey, JSON.stringify(payload)],
		() => GetPaymentReport(payload),
		{
			...options,
		},
	);
