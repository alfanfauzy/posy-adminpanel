/* eslint-disable @typescript-eslint/no-empty-function */
import {LinkedBankAccountBased} from '@/domain/bank/models';
import {PaymentAccountInfoBased} from '@/domain/payment/models';
import {createContext} from 'react';

type PaymentSettingContextProps = {
	bankAccountData: LinkedBankAccountBased | undefined;
	paymentAccountInfoData: PaymentAccountInfoBased | undefined;
	handleOpenModal: () => void;
	setIsEdit: (value: boolean) => void;
};

export const PaymentSettingContext = createContext<PaymentSettingContextProps>({
	bankAccountData: undefined,
	paymentAccountInfoData: undefined,
	handleOpenModal: () => {},
	setIsEdit: () => {},
});
