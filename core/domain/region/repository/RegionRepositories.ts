import {FilterInputVariables} from '@/domain/vo/BaseInput';
import {Pagination} from 'core/domain/vo/BasePagination';
import {Datalist, ResultQuery} from 'core/domain/vo/BaseResponse';

import {
	City,
	Cityes,
	District,
	Districts,
	Provinces,
	RegionBased,
	SubDistrict,
	SubDistricts,
} from '../models';

/**
 * GET Province
 */

export type GetFilterProvinceInput = FilterInputVariables<
	'created_at',
	keyof Pick<RegionBased, 'id'>
>;

export type GetProvinceResult = ResultQuery<Provinces | undefined> & {
	pagination: Pagination | undefined;
};

/**
 * GET City
 */

export type GetFilterCityInput = FilterInputVariables<
	'created_at',
	keyof Pick<City, 'province_id'>
>;

export type GetCityResult = ResultQuery<Cityes | undefined> & {
	pagination: Pagination | undefined;
};

/**
 * GET District
 */

export type GetFilterDistrictInput = FilterInputVariables<
	'created_at',
	keyof Pick<District, 'city_id'>
>;

export type GetDistrictResult = ResultQuery<Districts | undefined> & {
	pagination: Pagination | undefined;
};

/**
 * GET Sub District
 */

export type GetFilterSubDistrictInput = FilterInputVariables<
	'created_at',
	keyof Pick<SubDistrict, 'district_id'>
>;

export type GetSubDistrictResult = ResultQuery<SubDistricts | undefined> & {
	pagination: Pagination | undefined;
};
