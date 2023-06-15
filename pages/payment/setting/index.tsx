import MoleculesMetaHeader from '@/molecules/meta-header';
import PaymentSettingLayout from '@/organisms/form/payment/setting-general';
import GeneralLayout from '@/templates/layouts';
import React from 'react';

const PaymentPage = () => {
	return (
		<>
			<MoleculesMetaHeader
				title="Payment Setting - Admin Panel Fnb"
				description="Payment Setting - Admin Panel Fnb"
			/>
			<GeneralLayout menu="Payment" subMenu="Setting">
				<PaymentSettingLayout />
			</GeneralLayout>
		</>
	);
};

export default PaymentPage;
