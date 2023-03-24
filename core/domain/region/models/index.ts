export interface RegionBased {
  id: string
  name: string
}

interface CityBased extends RegionBased {
  province_id: string
}

interface DistrictBased extends RegionBased {
  city_id: string
}

interface SubDistrictBased extends RegionBased {
  district_id: string
}

export type Provinces = RegionBased[]
export type Province = RegionBased

export type Cityes = CityBased[]
export type City = CityBased

export type Districts = DistrictBased[]
export type District = DistrictBased

export type SubDistricts = SubDistrictBased[]
export type SubDistrict = SubDistrictBased
