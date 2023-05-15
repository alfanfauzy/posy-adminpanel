import MoleculesMetaHeader from '@/molecules/meta-header';
import HistoryTransactionLayout from '@/pages/history/report';
import GeneralLayout from '@/templates/layouts';
import React from 'react';

const TransactionPage = () => {
	return (
		<>
			<MoleculesMetaHeader
				title="Transaaction History - Admin Panel Fnb"
				description="Dashboard - Admin Panel Fnb"
			/>
			<GeneralLayout menu="Transaction" subMenu="History">
				<HistoryTransactionLayout />
			</GeneralLayout>
		</>
	);
};

export default TransactionPage;
