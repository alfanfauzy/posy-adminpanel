import {GetPaymentMethodCategoryListResponse} from '@/data/payment/types';
import {PaymentMethodCategorys} from '@/domain/payment/models';
import {PaymentMethodCategoryPayload} from '@/domain/payment/models/index';

export const mapToPaymentMethodCategoryModel = (
	datas: Array<GetPaymentMethodCategoryListResponse>,
): PaymentMethodCategorys =>
	datas.map(data => ({
		uuid: data.uuid,
		name: data.name,
		logo_url: data.logo_url,
		description: data.description,
		priority: data.priority,
		is_show: data.is_show,
		is_integration: data.is_integration,
		payment_method: data.payment_method.map(el => ({
			code: el.code,
			is_integration: el.is_integration,
			is_show: el.is_show,
			logo_url: el.logo_url,
			name: el.name,
			payment_method_category_uuid: el.payment_method_category_uuid,
			priority: el.priority,
			uuid: el.uuid,
		})),
	}));

export const mapToPaymentMethodCategoryPayload = (
	datas: PaymentMethodCategoryPayload,
): PaymentMethodCategoryPayload => ({
	payment_method_category: [
		...datas.payment_method_category.map(paymentMethodCategory => ({
			uuid: paymentMethodCategory.uuid,
			is_show: paymentMethodCategory.is_show,
			payment_method: paymentMethodCategory.payment_method.map(
				paymentMethod => ({
					uuid: paymentMethod.uuid,
					is_show: !paymentMethodCategory.is_show
						? false
						: paymentMethod.is_show,
				}),
			),
		})),
	],
});
