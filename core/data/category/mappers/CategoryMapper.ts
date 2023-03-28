import {Categorys} from '@/domain/category/models';

import {GetCategoryListDataResponse} from '../types';

export const mapToCategoryModel = (
	datas: Array<GetCategoryListDataResponse>,
): Categorys =>
	datas.map(data => ({
		name: data.category_name,
		is_active: data.is_active,
		uuid: data.uuid,
		restaurant_uuid: data.restaurant_uuid,
		seconds: data.metadata.created_at.seconds,
	}));
