import {TransactionDetail} from '@/domain/transaction/model/GetTransactionDetailModel';
import {PaymentSummary} from '@/domain/transaction/repositories/GetPaymentSummaryRepository';

import {GetPaymentSummaryDataResponse} from '../types/GetPaymentSummaryType';
import {GetTransactionDetailResponse} from '../types/GetTransactionDetailType';

export const mapToPaymentSummaryModel = (
	data: GetPaymentSummaryDataResponse,
): PaymentSummary => ({
	discount_general_percentage: data.discount_general_percentage,
	discount_general_price: data.discount_general_price,
	discount_product_price: data.discount_product_price,
	payment_price: data.payment_price,
	subtotal_price: data.subtotal_price,
	tax_and_charge: {
		service_charge_price: data.tax_and_charge.service_charge_price,
		tax_and_charge_price: data.tax_and_charge.tax_and_charge_price,
		tax_price: data.tax_and_charge.tax_price,
		tax_percentage: data.tax_and_charge.tax_percentage,
		is_service_charge_taxable: data.tax_and_charge.is_service_charge_taxable,
		is_tax: data.tax_and_charge.is_tax,
		is_service_charge: data.tax_and_charge.is_service_charge,
		service_charge_percentage: data.tax_and_charge.service_charge_percentage,
		tax_type: data.tax_and_charge.tax_type,
	},
});

export const mapToTransactionDetailModel = (
	data: GetTransactionDetailResponse,
): TransactionDetail => ({
	cashier_by: data.cashier_by,
	change_amount: data.change_amount,
	created_at: data.created_at.seconds,
	customer_email: data.customer_email,
	customer_name: data.customer_name,
	customer_phone: data.customer_phone,
	first_order_at: data.first_order_at.seconds,
	need_print_to_kitchen: data.need_print_to_kitchen,
	paid_amount: data.paid_amount,
	paid_at: data.paid_at.seconds,
	payment_method_category_name: data.payment_method_category_name,
	payment_method_category_uuid: data.payment_method_category_uuid,
	payment_method_name: data.payment_method_name,
	payment_method_uuid: data.payment_method_uuid,
	price_after_discount: data.price_after_discount,
	price_discount: data.price_discount,
	price_final: data.price_final,
	price_tax: data.price_tax,
	restaurant_outlet_uuid: data.restaurant_outlet_uuid,
	restaurant_uuid: data.restaurant_uuid,
	served_by: data.served_by,
	session_suffix: data.session_suffix,
	table_number: data.table_number,
	total_order: data.total_order,
	total_pax: data.total_pax,
	total_price: data.total_price,
	transaction_category: data.transaction_category,
	updated_at: data.updated_at.seconds,
	uuid: data.uuid,
});
