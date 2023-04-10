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
	restaurant_logo_url?: string | undefined;
	restaurant_code?: string | undefined;
	restaurant_phone: string;
	restaurant_email: string;
	restaurant_address: string;
	nib_url?: string | undefined;
	npwp_url?: string | undefined;
	owner_name: string;
	owner_phone: string;
	subscription_uuid: {value: string; label: string};
	start_date: string | number;
};
