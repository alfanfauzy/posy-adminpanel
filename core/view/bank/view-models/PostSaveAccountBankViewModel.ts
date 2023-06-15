import {useSaveBankAccountUsecase} from '@/data/bank/usecases/PostSaveBankAccountUsecase';
import {SaveBankAccountResponse} from '@/domain/bank/models';
import {SaveBankAccountRepository} from '@/domain/bank/repositories/BankRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useSaveAccountBankViewModal = (
	options?: MutationOptions<SaveBankAccountResponse>,
): SaveBankAccountRepository => {
	const result = useSaveBankAccountUsecase(options);

	return result;
};
