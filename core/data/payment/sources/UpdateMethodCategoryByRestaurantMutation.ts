import {UpdatePaymentMethodCategoryResponse} from '@/data/payment/types';
import {PaymentMethodCategoryByRestaurantPayload} from '@/domain/payment/models';
import {Response} from '@/domain/vo/BaseResponse';
import Post from 'api/post';
import {AxiosError} from 'axios';
import {MutationOptions} from 'core/domain/vo/BaseMutation';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';
import {ErrorType} from 'types/index';

export const UpdatePaymentMethodCategoryByRestaurantService = async (
	param: PaymentMethodCategoryByRestaurantPayload,
): Promise<Response<UpdatePaymentMethodCategoryResponse>> => {
	const {payload, payment_method_uuid, restaurant_uuid} = param;
	try {
		const response = await Post({
			endpoint: `/api/fnb-order-service/v2/internal/payment-method/update/${payment_method_uuid}?restaurant_uuid=${restaurant_uuid}`,
			payload,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useUpdatePaymentMethodCategoryByRestaurantMutation = (
	options?: MutationOptions<UpdatePaymentMethodCategoryResponse>,
) =>
	useMutation({
		mutationFn: (param: PaymentMethodCategoryByRestaurantPayload) =>
			UpdatePaymentMethodCategoryByRestaurantService(param),
		onError(error: ErrorType) {
			toast.error(error.message);
		},
		...options,
	});
