export type RegionBased = {
	id: string;
	name: string;
};

export type GetProvinceList = RegionBased;

export type GetCityList = {
	province_id: string;
} & RegionBased;

export type GetDistrictList = {
	city_id: string;
} & RegionBased;

export type GetSubDistrictList = {
	district_id: string;
} & RegionBased;
