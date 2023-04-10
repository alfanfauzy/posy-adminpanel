import {DeleteProductResult} from '@/domain/product/repositories/ProductRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

import {useDeleteProductMutation} from '../sources/DeleteProductMutation';
import {DeleteProductResponse} from '../types';

export const useDeleteProductUsecase = (
	options?: MutationOptions<DeleteProductResponse>,
): any => {
	const {mutate, data, ...rest} = useDeleteProductMutation(options);

	const deleteProduct = (payload: DeleteProductResult) => {
		mutate(payload);
	};

	return {
		deleteProduct,
		data: data?.data.data,
		...rest,
	};
};
