import {
	GetFilterDetailProduct,
	GetProductResult,
} from '@/domain/product/repositories/ProductRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from 'react-query';

import {mapToDetailProductModel} from '../mappers/ProductMapper';
import {useGetDetailProductQuery} from '../sources/GetDetailProductQuery';
import {GetDetailProductResponse} from '../types';

export const useGetDetailProductUsecase = (
	input: GetFilterDetailProduct,
	options?: UseQueryOptions<Response<GetDetailProductResponse>>,
): GetProductResult => {
	const {data, ...rest} = useGetDetailProductQuery(input, options);

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
