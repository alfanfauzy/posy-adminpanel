import {Loading} from '@/atoms/loading';
import {useAccessControl} from '@/hooks/useAccessControl';
import useToggle from '@/hooks/useToggle';
import PaymentInformationMolecules from '@/molecules/payment/information';
import PaymentOptionForm from '@/organisms/form/payment/options';
import FormPaymentSetting from '@/organisms/form/payment/setting';
import {useGetLinkedBankAccountViewModel} from '@/view/bank/view-models/GetLinkedBankAccountViewModel';
import {useGetPaymentAccountInfoViewModel} from '@/view/payment/view-models/GetPaymentAccountInfoViewModel';
import {useRouter} from 'next/router';
import React, {useMemo, useState} from 'react';
import {PaymentSettingContext} from 'store/context/PaymentContext';

import PaymentReportLayout from '../paymentReport';

type PaymentSettingLayoutProps = {
	tabsVal: number;
};

const PaymentSettingLayout = ({tabsVal}: PaymentSettingLayoutProps) => {
	const {query} = useRouter();
	const {hasAccess} = useAccessControl();
	const {restaurantID} = query;

	const [isEdit, setIsEdit] = useState(false);
	const {value: isOpenModal, toggle: handleOpenModal} = useToggle(false);

	const {data: bankAccountData, isLoading} = useGetLinkedBankAccountViewModel(
		restaurantID as string,
		{enabled: !!restaurantID && hasAccess('payment_integration:view')},
	);

	const {data: paymentAccountInfoData, isLoading: isLoadingPaymentAccountInfo} =
		useGetPaymentAccountInfoViewModel(restaurantID as string, {
			enabled: bankAccountData !== undefined,
		});

	/**
	 * Payment Setting Context
	 */

	const valueProvider = useMemo(
		() => ({
			bankAccountData,
			paymentAccountInfoData,
			handleOpenModal,
			setIsEdit,
		}),
		[bankAccountData, paymentAccountInfoData, handleOpenModal, setIsEdit],
	);

	return (
		<div className="pt-5">
			<PaymentSettingContext.Provider value={valueProvider}>
				<h1 className="mb-6 text-xxl-bold">Payment Integration</h1>

				{isLoading || isLoadingPaymentAccountInfo ? (
					<Loading size={30} height="unset" />
				) : (
					<>
						<PaymentInformationMolecules />
						{hasAccess('payment_integration:manage_payment_method') &&
							bankAccountData && <PaymentOptionForm />}
						{bankAccountData && <PaymentReportLayout />}
					</>
				)}

				{isOpenModal && (
					<FormPaymentSetting
						tabsVal={tabsVal}
						isOpenModal={isOpenModal}
						handleOpenModal={handleOpenModal}
						isEdit={isEdit}
						setIsEdit={setIsEdit}
					/>
				)}
			</PaymentSettingContext.Provider>
		</div>
	);
};

export default PaymentSettingLayout;
