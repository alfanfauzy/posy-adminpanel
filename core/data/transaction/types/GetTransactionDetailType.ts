export type GetTransactionDetailResponse = {
	uuid: string;
	restaurant_uuid: string;
	restaurant_outlet_uuid: string;
	table_number: string;
	total_pax: number;
	total_order: number;
	total_price: number;
	price_tax: number;
	price_discount: number;
	price_after_discount: number;
	price_final: number;
	session_suffix: string;
	transaction_category: string;
	customer_name: string;
	customer_phone: string;
	customer_email: string;
	cashier_by: string;
	served_by: string;
	paid_amount: number;
	change_amount: number;
	payment_method_uuid: string;
	payment_method_name: string;
	payment_method_category_uuid: string;
	payment_method_category_name: string;
	need_print_to_kitchen: boolean;
	created_at: {
		seconds: number;
	};
	updated_at: {
		seconds: number;
		nanos: number;
	};
	first_order_at: {
		seconds: number;
	};
	paid_at: {
		seconds: number;
	};
};
