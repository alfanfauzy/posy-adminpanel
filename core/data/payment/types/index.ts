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
