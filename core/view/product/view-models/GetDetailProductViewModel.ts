import {useGetDetailProductUsecase} from '@/data/product/usecases/GetDetailProductUsecase';
import {
	GetFilterDetailProduct,
	GetProductResult,
} from '@/domain/product/repositories/ProductRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from 'react-query';

import {GetDetailProductResponse} from './../../../data/product/types/index';

export const useGetDetailProductViewModal = (
	input: GetFilterDetailProduct,
	options?: UseQueryOptions<Response<GetDetailProductResponse>>,
): GetProductResult => {
	const result = useGetDetailProductUsecase(input, options);

	return result;
};
