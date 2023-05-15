import {GetFilterReportTransaction} from '@/domain/report-transaction/repositories/ReportTransactionRepository';
import Post from 'api/post';
import {AxiosError} from 'axios';
import {useQuery, UseQueryOptions} from 'react-query';

import {Datalist, Response} from '../../../domain/vo/BaseResponse';
import {GetReportTransactionResponse} from '../types';

export const GetReportTransaction = async (
	input?: GetFilterReportTransaction,
): Promise<Response<Datalist<GetReportTransactionResponse>>> => {
	try {
		const response = await Post({
			endpoint: `/api/fnb-order-service/internal/report/transaction/list`,
			payload: input,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useGetReportTransactionQuery = (
	input?: GetFilterReportTransaction,
	options?: UseQueryOptions<Response<Datalist<GetReportTransactionResponse>>>,
) =>
	useQuery<Response<Datalist<GetReportTransactionResponse>>>(
		['report/transaction/list', JSON.stringify(input)],
		() => GetReportTransaction(input),
		{
			enabled: !!JSON.stringify(input),
			...options,
		},
	);
