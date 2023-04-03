import {MutationOptions} from 'core/domain/vo/BaseMutation';

import {useUpdateProductMutation} from '../sources/UpdateProductQuery';
import {UpdateProductResponse} from '../types';
import {UpdateProductParams} from './../../../domain/product/repositories/ProductRepository';

export const useUpdateProductUsecase = (
	options?: MutationOptions<UpdateProductResponse>,
): any => {
	const {mutate, data, ...rest} = useUpdateProductMutation(options);

	const updateProduct = (payload: UpdateProductParams) => {
		mutate(payload);
	};

	return {
		updateProduct,
		data: data?.data.data,
		...rest,
	};
};
