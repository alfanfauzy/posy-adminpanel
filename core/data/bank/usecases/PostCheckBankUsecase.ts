import {usePostCheckBankMutation} from '@/data/bank/sources/PostCheckBankMutation';
import {GetCheckBankResponse} from '@/data/bank/types';
import {PayloadBankCheck} from '@/domain/bank/repositories/BankRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useCheckBankUsecase = (
	options?: MutationOptions<GetCheckBankResponse>,
): any => {
	const {mutate, data, ...rest} = usePostCheckBankMutation(options);

	const checkBank = (payload: PayloadBankCheck) => {
		mutate(payload);
	};

	return {
		checkBank,
		data: data?.data,
		...rest,
	};
};
