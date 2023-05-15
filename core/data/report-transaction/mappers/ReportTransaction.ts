import {ReportTransactions} from '@/domain/report-transaction/models';

import {GetReportTransactionResponse} from '../types';

export const mapToReportTransactionModel = (
	datas: Array<GetReportTransactionResponse>,
): ReportTransactions =>
	datas.map(data => ({
		restaurant_name: data.restaurant_name,
		restaurant_email: data.restaurant_email,
		payment_method: data.payment_method_name,
		amount: data.total_price_final,
		cashier: data.cashier_by,
		outlet_name: data.restaurant_outlet_name,
		status: data.status,
		transaction_id: data.transaction_code,
		waiter: data.served_by,
		type_of_order: data.transaction_category,
		date: data.created_at.seconds,
	}));
