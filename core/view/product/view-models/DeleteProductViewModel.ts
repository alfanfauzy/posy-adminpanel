import {DeleteProductResponse} from '@/data/product/types';
import {useDeleteProductUsecase} from '@/data/product/usecases/DeleteProductUsecase';
import {DeleteProductRepository} from '@/domain/product/repositories/ProductRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useDeleteProductViewModal = (
	options?: MutationOptions<DeleteProductResponse>,
): DeleteProductRepository => {
	const result = useDeleteProductUsecase(options);

	return result;
};
