export type ObjectSelect = {
	value: string;
	label: string;
};

export type FormManageOutletEntities = {
	restaurant_uuid: {label: string; value: string};
	outlet_name: string;
	outlet_code?: string | undefined;
	province_id: {label: string; value: string} | null;
	city_id: {label: string; value: string} | null;
	district_id: {label: string; value: string} | null;
	subdistrict_id: {label: string; value: string} | null;
	latitude?: string | undefined;
	longitude?: string | undefined;
	address: string;
	phone: string;
	email: string;
	qty_table: string;
};
