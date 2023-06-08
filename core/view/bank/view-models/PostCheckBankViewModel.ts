import {GetCheckBankResponse} from '@/data/bank/types';
import {useCheckBankUsecase} from '@/data/bank/usecases/PostCheckBankUsecase';
import {CheckBankRepository} from '@/domain/bank/repositories/BankRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useCheckBankViewModal = (
	options?: MutationOptions<GetCheckBankResponse>,
): CheckBankRepository => {
	const result = useCheckBankUsecase(options);

	return result;
};
