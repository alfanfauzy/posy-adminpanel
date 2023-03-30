import {CreateProductInput} from '@/domain/product/repositories/ProductRepository';
import Post from 'api/post';
import {AxiosError} from 'axios';
import {MutationOptions} from 'core/domain/vo/BaseMutation';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';
import {ErrorType} from 'types/index';

import {Response} from '../../../domain/vo/BaseResponse';
import {CreateProductResponse} from '../types';

export const CreateProductService = async (
	payload: CreateProductInput,
): Promise<Response<CreateProductResponse>> => {
	try {
		const response = await Post({
			endpoint: `/api/fnb-product-service/internal/product/create`,
			payload,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useCreateProductMutation = (
	options?: MutationOptions<CreateProductResponse>,
) =>
	useMutation({
		mutationFn: (payload: CreateProductInput) => CreateProductService(payload),
		onError(error: ErrorType) {
			toast.error(error.message);
		},
		...options,
	});
