import {
	GetPaymentAccountInfoResponse,
	GetPaymentMethodCategoryListResponse,
	GetPaymentMethodListResponse,
} from '@/data/payment/types';
import {
	PaymentAccountInfo,
	PaymentMethodCategorys,
	PaymentMethods,
} from '@/domain/payment/models';
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
			uuid: el.uuid,
			code: el.code,
			name: el.name,
			description: el.description,
			logo_url: el.logo_url,
			is_show: el.is_show,
			is_integration: el.is_integration,
			charge_fee: el.charge_fee,
			charge_fee_unit: el.charge_fee_unit,
			show_for_dm: el.show_for_dm,
			show_for_pos: el.show_for_pos,
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

export const mapToPayemntAccountInfo = (
	data: GetPaymentAccountInfoResponse,
): PaymentAccountInfo => ({
	type: data.type,
	status: data.status,
});

export const mapToPaymentMethod = (
	datas: Array<GetPaymentMethodListResponse>,
): PaymentMethods =>
	datas.map(data => ({
		uuid: data.uuid,
		code: data.code,
		name: data.name,
		description: data.description,
		logo_url: data.logo_url,
		is_show: data.is_show,
		is_integration: data.is_integration,
		charge_fee: data.charge_fee,
		charge_fee_unit: data.charge_fee_unit,
		show_for_dm: data.show_for_dm,
		show_for_pos: data.show_for_pos,
	}));

export const mapToPaymentMethodCategorySelectObject = (
	datas: Array<GetPaymentMethodCategoryListResponse>,
) =>
	datas.map(payment => ({
		value: payment.uuid,
		title:
			payment.name === 'E-Wallet - Integration [TESTING PURPOSE]'
				? 'E-Wallet'
				: payment.name,
		is_integration: payment.is_integration,
		children:
			payment.name !== 'Cash'
				? payment.payment_method.map(paymentMethod => ({
						value: paymentMethod.uuid,
						title: paymentMethod.name,
				  }))
				: [],
	}));
