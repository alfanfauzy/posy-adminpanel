export type OutletBased = {
	uuid: string;
	restaurant_uuid: string;
	restaurant_name: string;
	outlet_name: string;
	outlet_code: string;
	address: string;
	phone: string;
	latitude: string;
	longitude: string;
	email: string;
	table: string;
	provincy_id: string;
	provincy_name: string;
	city_id: string;
	city_name: string;
	district_id: string;
	district_name: string;
	subdistrict_id: string;
	subdistrict_name: string;
};

export type Outlet = OutletBased;

export type Outlets = Array<OutletBased>;

export type FormOutlet = {
	restaurant_uuid: string;
	outlet_name: string;
	outlet_code: string;
	subdistrict_id: string | undefined;
	address: string;
	latitude: string;
	longitude: string;
	phone: string;
	email: string;
};
