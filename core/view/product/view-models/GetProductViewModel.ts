import {useGetProductUsecase} from '@/data/product/usecases/GetProductUsecase';
import {
	GetFilterProductInput,
	GetProductsResult,
} from '@/domain/product/repositories/ProductRepository';

export const useGetProductViewModal = (
	input: GetFilterProductInput,
): GetProductsResult => {
	const result = useGetProductUsecase(input);

	return result;
};
