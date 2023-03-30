import {
	GetFilterDetailProduct,
	GetProductResult,
} from '@/domain/product/repositories/ProductRepository';

import {mapToDetailProductModel} from '../mappers/ProductMapper';
import {useGetDetailProductQuery} from '../sources/GetDetailProductQuery';

export const useGetDetailProductUsecase = (
	input: GetFilterDetailProduct,
): GetProductResult => {
	const {data, ...rest} = useGetDetailProductQuery(input);

	if (data?.data) {
		const detailProductMapper = mapToDetailProductModel(data.data);

		return {
			data: detailProductMapper,
			...rest,
		};
	}

	return {
		data: undefined,
		...rest,
	};
};
