import {CreateProductResponse} from '@/data/product/types';
import {useCreateProductUsecase} from '@/data/product/usecases/CreateProductUsecase';
import {CreateProductRepository} from '@/domain/product/repositories/ProductRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useCreateProductViewModal = (
	options?: MutationOptions<CreateProductResponse>,
): CreateProductRepository => {
	const result = useCreateProductUsecase(options);

	return result;
};
