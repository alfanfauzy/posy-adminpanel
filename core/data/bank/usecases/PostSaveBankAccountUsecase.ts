import {useCreateSaveBankAccountMutation} from '@/data/bank/sources/PostSaveBankAccountMutation';
import {SaveBankAccountResponse} from '@/domain/bank/models';
import {PayloadSaveBankAccount} from '@/domain/bank/repositories/BankRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useSaveBankAccountUsecase = (
	options?: MutationOptions<SaveBankAccountResponse>,
): any => {
	const {mutate, data, ...rest} = useCreateSaveBankAccountMutation(options);

	const saveBankAccount = (payload: PayloadSaveBankAccount) => {
		mutate(payload);
	};

	return {
		saveBankAccount,
		data: data?.data,
		...rest,
	};
};
