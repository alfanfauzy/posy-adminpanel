export type FileBase = {
	name: string;
	size: number;
	type: string;
	lastModified: number;
	lastModifiedDate?: Date;
};

export type FormRestaurantEntities = {
	restaurant_name: string;
	restaurant_description: string;
	restaurant_logo_url: string;
	restaurant_code: string;
	restaurant_phone: string;
	restaurant_email: string;
	restaurant_address: string;
	nib_url: string;
	npwp_url: string;
	owner_name: string;
	owner_phone: string;
	subscription_uuid: {value: string; label: string};
	start_date: string | number;
};
