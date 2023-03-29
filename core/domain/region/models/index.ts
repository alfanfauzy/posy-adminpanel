export type RegionBased = {
	id: string;
	name: string;
};

type CityBased = {
	province_id: string;
} & RegionBased;

type DistrictBased = {
	city_id: string;
} & RegionBased;

type SubDistrictBased = {
	district_id: string;
} & RegionBased;

export type Provinces = Array<RegionBased>;
export type Province = RegionBased;

export type Cityes = Array<CityBased>;
export type City = CityBased;

export type Districts = Array<DistrictBased>;
export type District = DistrictBased;

export type SubDistricts = Array<SubDistrictBased>;
export type SubDistrict = SubDistrictBased;
