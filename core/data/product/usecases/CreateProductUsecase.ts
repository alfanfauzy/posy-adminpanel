import {CreateProductInput} from '@/domain/product/repositories/ProductRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

import {useCreateProductMutation} from '../sources/CreateOutletQuery';
import {CreateProductResponse} from '../types';

export const useCreateProductUsecase = (
	options?: MutationOptions<CreateProductResponse>,
): any => {
	const {mutate, data, ...rest} = useCreateProductMutation(options);

	const createProduct = (payload: CreateProductInput) => {
		mutate(payload);
	};

	return {
		createProduct,
		data: data?.data.data,
		...rest,
	};
};
