/**
 * GET
 */

import {FilterInputVariables} from '@/domain/vo/BaseInput';
import {Pagination} from '@/domain/vo/BasePagination';
import {ResultQuery} from '@/domain/vo/BaseResponse';

import {ReportTransaction, ReportTransactions} from '../models';

export type GetFilterReportTransaction = FilterInputVariables<
	'created_at',
	keyof Pick<
		ReportTransaction,
		'outlet_name' | 'status' | 'type_of_order' | 'date'
	>
>;

export type GetReportTransactionsResult = ResultQuery<
	ReportTransactions | undefined
> & {
	pagination: Pagination | undefined;
};
