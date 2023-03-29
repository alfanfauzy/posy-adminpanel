import {Metadata} from '@/domain/vo/BaseMetadata';

export type GetOutletListDataResponse = {
	restaurant_code: string;
	province_id: string;
	province_name: string;
	city_id: string;
	city_name: string;
	district_id: string;
	district_name: string;
	subdistrict_id: string;
	subdistrict_name: string;
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
	table: string;
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
