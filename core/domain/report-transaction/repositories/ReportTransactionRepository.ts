/**
 * GET
 */

import {
	ReportTransaction,
	ReportTransactions,
} from '@/domain/report-transaction/models';
import {FilterInputVariables} from '@/domain/vo/BaseInput';
import {Pagination} from '@/domain/vo/BasePagination';
import {ResultMutation, ResultQuery} from '@/domain/vo/BaseResponse';

export type GetFilterReportTransaction = FilterInputVariables<
	'created_at',
	| keyof Pick<ReportTransaction, 'status'>
	| 'created_at'
	| 'transaction_category'
	| 'payment_method_uuid'
	| 'keyword'
	| 'restaurant_outlet_uuid'
> & {
	restaurant_uuid: string;
};

export type GetReportTransactionsResult = ResultQuery<
	ReportTransactions | undefined
> & {
	pagination: Pagination | undefined;
};

export type GetDownloadTransactionReportInput = FilterInputVariables<
	unknown,
	| 'restaurant_outlet_uuid'
	| 'status'
	| 'transaction_category'
	| 'payment_method_uuid'
> & {
	restaurant_uuid: string;
	start_date: string;
	end_date: string;
};

export type DownloadReportsResult = string;

export type GetDownloadReportsResult = ResultMutation<
	DownloadReportsResult | undefined
>;

export type GetDownloadReportsRepository = {
	downloadReport(input: GetDownloadTransactionReportInput): void;
} & GetDownloadReportsResult;
