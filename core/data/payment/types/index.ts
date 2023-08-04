import {PaymentMethod} from '@/domain/payment/models';
import {Metadata} from '@/domain/vo/BaseMetadata';

export type GetPaymentMethodCategoryListResponse = {
	uuid: string;
	name: string;
	description: string;
	logo_url: string;
	priority: number;
	is_show: boolean;
	is_integration: boolean;
	payment_method: Array<PaymentMethod>;
};

export type UpdatePaymentMethodCategoryResponse = {
	success: string;
	metadata: Metadata;
};

export type GetPaymentAccountInfoResponse = {
	restaurant_uuid: string;
	account_id: string;
	type: string;
	email: string;
	business_name: string;
	status: string;
};

export type GetPaymentMethodListResponse = {
	uuid: string;
	code: string;
	name: string;
	description: string;
	logo_url: string;
	is_show: boolean;
	is_integration: boolean;
	integration_code: string;
	settlement_info: string;
	unit: string;
	charge_fee_unit: 'percent' | 'flat';
	metadata: Metadata;
	charge_fee: number;
	show_for_dm: boolean;
	show_for_pos: boolean;
};

export type GetPaymentReportListResponse = {
	has_more: boolean;
	objs: Array<{
		id: string;
		reference_id: string;
		reference_detail: {
			type: string;
			code: string;
			created_at: string;
			organization_type: string;
			organization_name: string;
		};
		type: string;
		payment_method: {
			name: string;
			logo_url: string;
			category_name: string;
		};
		currency: string;
		amount: number;
		fee: number;
		fee_detail: {
			charge_fee: number;
			charge_fee_unit: 'percent' | 'flat';
			charge_amount: number;
			vat_amount: number;
			charge_withholding_tax: number;
			thirdparty_withholding_tax: number;
		};
		net_amount: number;
		cashflow: string;
		status: string;
		settlement_status: string;
		estimated_settlement_time: string;
		metadata: {
			created_at: string;
			updated_at: string;
		};
	}>;
	links: Array<{
		href: string;
		rel: string;
		method: string;
	}>;
};
