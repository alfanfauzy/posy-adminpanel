import {
	GetFilterReportTransaction,
	GetReportTransactionsResult,
} from '@/domain/report-transaction/repositories/ReportTransactionRepository';
import {Datalist, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from 'react-query';

import {mapToReportTransactionModel} from '../mappers/ReportTransaction';
import {useGetReportTransactionQuery} from '../sources/GetReportTransaction';
import {GetReportTransactionResponse} from '../types';

export const useGetReportTransactionUsecase = (
	input?: GetFilterReportTransaction,
	options?: UseQueryOptions<Response<Datalist<GetReportTransactionResponse>>>,
): GetReportTransactionsResult => {
	const {data, ...rest} = useGetReportTransactionQuery(input, options);

	if (data?.data.objs) {
		const reportTransactionMapper = mapToReportTransactionModel(data.data.objs);

		return {
			data: reportTransactionMapper,
			pagination: {
				curr_page: data.data.curr_page,
				per_page: data.data.per_page,
				total_objs: data.data.total_objs,
				total_page: data.data.total_page,
			},
			...rest,
		};
	}

	return {
		data: undefined,
		pagination: undefined,
		...rest,
	};
};
