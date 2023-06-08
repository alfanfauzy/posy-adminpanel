export type PaymentMethodBased = {
	uuid: string;
	name: string;
	payment_method_category_uuid: string;
	logo_url: string;
	priority: number;
	is_show: boolean;
	is_integration: boolean;
	code: string;
};

export type PaymentMethodCategoryBased = {
	uuid: string;
	name: string;
	description: string;
	logo_url: string;
	priority: number;
	is_show: boolean;
	is_integration: boolean;
	payment_method: Array<PaymentMethodBased>;
};

export type PaymentMethodCategoryPayload = {
	payment_method_category: Array<{
		uuid: string;
		is_show: boolean;
		payment_method: Array<{
			uuid: string;
			is_show: boolean;
		}>;
	}>;
};

export type PaymentMethodCategory = PaymentMethodCategoryBased;
export type PaymentMethodCategorys = Array<PaymentMethodCategoryBased>;

export type PaymentMethod = PaymentMethodBased;
export type PaymentMethods = Array<PaymentMethodBased>;

export type PaymentAccountInfoBased = {
	restaurant_uuid?: string;
	account_id?: string;
	type: string;
	email?: string;
	business_name?: string;
	status?: string;
};

export type PaymentAccountInfo = PaymentAccountInfoBased;

export type PaymentMethodCategoryByRestaurantPayload = {
	restaurant_uuid: string;
	payment_method_category: Array<{
		uuid: string;
		is_show: boolean;
		payment_method: Array<{
			uuid: string;
			is_show: boolean;
		}>;
	}>;
};
