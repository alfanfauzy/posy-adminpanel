import {DeleteProductResult} from '@/domain/product/repositories/ProductRepository';
import Post from 'api/post';
import {AxiosError} from 'axios';
import {MutationOptions} from 'core/domain/vo/BaseMutation';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';
import {ErrorType} from 'types/index';

import {Response} from '../../../domain/vo/BaseResponse';
import {DeleteProductResponse} from '../types';

export const DeleteProductService = async (
	id: DeleteProductResult,
): Promise<Response<DeleteProductResponse>> => {
	try {
		const response = await Post({
			endpoint: `/api/fnb-product-service/internal/product/delete/${id}`,
			payload: {},
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useDeleteProductMutation = (
	options?: MutationOptions<DeleteProductResponse>,
) =>
	useMutation({
		mutationFn: (id: DeleteProductResult) => DeleteProductService(id),
		onError(error: ErrorType) {
			toast.error(error.message);
		},
		...options,
	});
