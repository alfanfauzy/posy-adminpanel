import {UpdateProductResponse} from '@/data/product/types';
import {useUpdateProductUsecase} from '@/data/product/usecases/UpdateProductUsecase';
import {UpdateProductRepository} from '@/domain/product/repositories/ProductRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useUpdateProductViewModal = (
	options?: MutationOptions<UpdateProductResponse>,
): UpdateProductRepository => {
	const result = useUpdateProductUsecase(options);

	return result;
};
