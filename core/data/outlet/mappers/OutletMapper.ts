import {GetOutletListDataResponse} from '@/data/outlet/type';
import {Outlets} from '@/domain/outlet/models';

export const mapToOutletModel = (
	datas: Array<GetOutletListDataResponse>,
): Outlets =>
	datas.map(data => ({
		uuid: data.uuid,
		address: data.address,
		outlet_name: data.outlet_name,
		outlet_code: data.outlet_code,
		phone: data.phone,
		latitude: data.latitude,
		longitude: data.longitude,
		restaurant_name: data.restaurant_name,
		seconds: data.metadata.created_at.seconds,
		restaurant_uuid: data.restaurant_uuid,
		email: data.email,
		qty_table: data.qty_table,
		city_id: data.region.city_id,
		city_name: data.region.city_name,
		provincy_id: data.region.province_id,
		provincy_name: data.region.province_name,
		district_id: data.region.district_id,
		district_name: data.region.district_name,
		subdistrict_id: data.region.subdistrict_id,
		subdistrict_name: data.region.subdistrict_name,
	}));

export const mapToOutletSelectObject = (
	ListDataOutlet: Outlets,
): Array<{label: string; value: string}> =>
	ListDataOutlet.map(outlet => ({
		label: outlet.outlet_name,
		value: outlet.uuid,
	}));
