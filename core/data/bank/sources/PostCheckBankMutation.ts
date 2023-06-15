import {GetCheckBankResponse} from '@/data/bank/types';
import {PayloadBankCheck} from '@/domain/bank/repositories/BankRepository';
import {MutationOptions} from '@/domain/vo/BaseMutation';
import {Response} from '@/domain/vo/BaseResponse';
import Post from 'api/post';
import {AxiosError} from 'axios';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';
import {ErrorType} from 'types/index';

export const GetCheckBank = async (
	payload: PayloadBankCheck,
): Promise<Response<GetCheckBankResponse>> => {
	try {
		const response = await Post({
			endpoint: `/api/fnb-payment-service/internal/bank/check-account`,
			payload,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const usePostCheckBankMutation = (
	options?: MutationOptions<GetCheckBankResponse>,
) =>
	useMutation({
		mutationFn: (payload: PayloadBankCheck) => GetCheckBank(payload),
		onError(error: ErrorType) {
			toast.error(error.more_info);
		},
		...options,
	});
