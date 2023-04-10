export type RestaurantBased = {
	uuid: string;
	name: string;
	email: string;
	phone: string;
	code: string;
	address: string;
	description: string;
	logo: string;
	npwp: string;
	nib: string;
	pic_name: string;
	pic_phone: string;
	subscription_uuid: string;
	subscription_name: string;
	seconds: number;
};

export type Restaurant = RestaurantBased;
export type Restaurants = Array<RestaurantBased>;

export type FormBodyPayload = {
	restaurant_name: string;
	restaurant_description: string;
	restaurant_logo_url?: string | undefined;
	restaurant_code?: string | undefined;
	restaurant_phone: string;
	restaurant_email: string;
	restaurant_address: string;
	nib_url?: string | undefined;
	npwp_url?: string | undefined;
	owner_name: string;
	owner_phone: string;
	subscription_uuid: string;
	start_date: number;
};

export type FormRestaurant = FormData;
