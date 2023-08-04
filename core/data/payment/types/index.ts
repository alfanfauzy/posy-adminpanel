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
	charge_fee: number;
	charge_fee_unit: string;
	show_for_dm: boolean;
	show_for_pos: boolean;
};
