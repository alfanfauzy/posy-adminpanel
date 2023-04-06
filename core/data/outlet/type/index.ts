import {Metadata} from '@/domain/vo/BaseMetadata';

export type Region = {
	province_id: string;
	province_name: string;
	city_id: string;
	city_name: string;
	district_id: string;
	district_name: string;
	subdistrict_id: string;
	subdistrict_name: string;
	postal_code: string;
};

export type GetOutletListDataResponse = {
	restaurant_code: string;
	region: Region;
	latitude: string;
	longitude: string;
	email: string;
	logo_image_url: string;
	uuid: string;
	restaurant_uuid: string;
	outlet_name: string;
	outlet_code: string;
	address: string;
	city: string;
	phone: string;
	restaurant_name: string;
	qty_table: string;
	metadata: Metadata;
};

export type CreateOutletResponse = {
	code: number;
	data: {
		uuid: string;
		metadata: Metadata;
	};
};

export type UpdateOutletResponse = CreateOutletResponse;
export type DeleteOutletResponse = CreateOutletResponse;
