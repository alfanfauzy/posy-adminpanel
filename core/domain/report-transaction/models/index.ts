export type ReportTransactionBased = {
	transaction_id: string;
	date: number;
	restaurant_name: string;
	restaurant_email: string;
	outlet_name: string;
	cashier: string;
	waiter: string;
	type_of_order: string;
	payment_method: string;
	status: string;
	amount: number;
};

export type ReportTransaction = ReportTransactionBased;
export type ReportTransactions = Array<ReportTransactionBased>;
