import {
  City,
  Cityes,
  District,
  Districts,
  Provinces,
  RegionBased,
  SubDistrict,
  SubDistricts,
} from '../models'
import { Datalist, ResultQuery } from 'core/domain/vo/BaseResponse'
import { Pagination } from 'core/domain/vo/BasePagination'
import { FilterInputVariables } from '@/domain/vo/BaseInput'

/**
 * GET Province
 */

export type GetFilterProvinceInput = FilterInputVariables<
  'created_at',
  keyof Pick<RegionBased, 'id'>
>

export type GetProvinceResult = ResultQuery<Datalist<Provinces> | undefined> & {
  pagination: Pagination | undefined
}

/**
 * GET City
 */

export type GetFilterCityInput = FilterInputVariables<
  'created_at',
  keyof Pick<City, 'province_id'>
>

export type GetCityResult = ResultQuery<Datalist<Cityes> | undefined> & {
  pagination: Pagination | undefined
}

/**
 * GET District
 */

export type GetFilterDistrictInput = FilterInputVariables<
  'created_at',
  keyof Pick<District, 'city_id'>
>

export type GetDistrictResult = ResultQuery<Datalist<Districts> | undefined> & {
  pagination: Pagination | undefined
}

/**
 * GET Sub District
 */

export type GetFilterSubDistrictInput = FilterInputVariables<
  'created_at',
  keyof Pick<SubDistrict, 'district_id'>
>

export type GetSubDistrictResult = ResultQuery<
  Datalist<SubDistricts> | undefined
> & {
  pagination: Pagination | undefined
}
