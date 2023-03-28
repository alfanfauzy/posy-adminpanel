import {
	GetCategorysResult,
	GetFilterCategoryInput,
} from '@/domain/category/repositories/CategoryRepository';

import {mapToCategoryModel} from '../mappers/CategoryMapper';
import {useGetCategoryQuery} from '../sources/GetCategoryQuery';

export const useGetCategoryUsecase = (
	input: GetFilterCategoryInput,
): GetCategorysResult => {
	const {data, ...rest} = useGetCategoryQuery(input);

	if (data?.data.objs) {
		const CategoryMapper = mapToCategoryModel(data.data.objs);

		return {
			data: CategoryMapper,
			pagination: {
				curr_page: data.data.curr_page,
				per_page: data.data.per_page,
				total_objs: data.data.total_objs,
				total_page: data.data.total_page,
			},
			...rest,
		};
	}

	return {
		data: undefined,
		pagination: undefined,
		...rest,
	};
};
