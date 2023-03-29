import {
	GetFilterProductInput,
	GetProductsResult,
} from '@/domain/product/repositories/ProductRepository';

import {mapToProductModel} from '../mappers/ProductMapper';
import {useGetProductQuery} from '../sources/GetProductQuery';

export const useGetProductUsecase = (
	input: GetFilterProductInput,
): GetProductsResult => {
	const {data, ...rest} = useGetProductQuery(input);

	if (data?.data.objs) {
		const productMapper = mapToProductModel(data.data.objs);

		return {
			data: productMapper,
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
