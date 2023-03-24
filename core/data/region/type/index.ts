export interface RegionBased {
  id: string
  name: string
}

export type GetProvinceList = RegionBased

export interface GetCityList extends RegionBased {
  province_id: string
}

export interface GetDistrictList extends RegionBased {
  city_id: string
}

export interface GetSubDistrictList extends RegionBased {
  district_id: string
}
