import {GetReportTransactionResponse} from '@/data/report-transaction/types';
import {useGetReportTransactionUsecase} from '@/data/report-transaction/usecases/GetReportTransactionUsecase';
import {
	GetFilterReportTransaction,
	GetReportTransactionsResult,
} from '@/domain/report-transaction/repositories/ReportTransactionRepository';
import {Datalist, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from 'react-query';

export const useGetReportTransactionViewModal = (
	input?: GetFilterReportTransaction,
	options?: UseQueryOptions<Response<Datalist<GetReportTransactionResponse>>>,
): GetReportTransactionsResult => {
	const result = useGetReportTransactionUsecase(input, options);

	return result;
};
