import {useGetDetailProductUsecase} from '@/data/product/usecases/GetDetailProductUsecase';
import {
	GetFilterDetailProduct,
	GetProductResult,
} from '@/domain/product/repositories/ProductRepository';

export const useGetDetailProductViewModal = (
	input: GetFilterDetailProduct,
): GetProductResult => {
	const result = useGetDetailProductUsecase(input);

	return result;
};
