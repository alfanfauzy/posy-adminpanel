import {
	Cityes,
	Districts,
	Provinces,
	SubDistricts,
} from '@/domain/region/models';

import {
	GetCityList,
	GetDistrictList,
	GetProvinceList,
	GetSubDistrictList,
} from '../type';

export const mapToProvinceModel = (datas: Array<GetProvinceList>): Provinces =>
	datas.map(data => ({
		id: data.id,
		name: data.name,
	}));

export const mapToCityModel = (datas: Array<GetCityList>): Cityes =>
	datas.map(data => ({
		id: data.id,
		province_id: data.province_id,
		name: data.name,
	}));

export const mapToDistrictModel = (datas: Array<GetDistrictList>): Districts =>
	datas.map(data => ({
		id: data.id,
		name: data.name,
		city_id: data.city_id,
	}));

export const mapToSubDistrictModel = (
	datas: Array<GetSubDistrictList>,
): SubDistricts =>
	datas.map(data => ({
		id: data.id,
		name: data.name,
		district_id: data.district_id,
	}));
