import {SaveBankAccountResponse} from '@/domain/bank/models';
import {PayloadSaveBankAccount} from '@/domain/bank/repositories/BankRepository';
import {MutationOptions} from '@/domain/vo/BaseMutation';
import {Response} from '@/domain/vo/BaseResponse';
import Post from 'api/post';
import {AxiosError} from 'axios';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';
import {ErrorType} from 'types/index';

export const CreateSaveBankAccount = async (
	payload: PayloadSaveBankAccount,
): Promise<Response<SaveBankAccountResponse>> => {
	try {
		const response = await Post({
			endpoint: `/api/fnb-payment-service/internal/bank/save-account`,
			payload,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useCreateSaveBankAccountMutation = (
	options?: MutationOptions<SaveBankAccountResponse>,
) =>
	useMutation({
		mutationFn: (payload: PayloadSaveBankAccount) =>
			CreateSaveBankAccount(payload),
		onError(error: ErrorType) {
			toast.error(error.more_info);
		},
		...options,
	});
