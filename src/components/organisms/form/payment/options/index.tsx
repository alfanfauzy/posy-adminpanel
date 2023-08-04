import PaymentOptionTable from '@/molecules/payment-option';
import {Tabs} from 'posy-fnb-core';
import React, {useState} from 'react';

export type PaymentOptionType = 'pos' | 'digital-menu';

const Item = [
	{key: 'pos', label: 'POS'},
	{key: 'digital-menu', label: 'Digital Menu'},
];

const PaymentOptionForm = () => {
	const [tabsVal, setTabsVal] = useState(0);

	const GenerateTablePaymentOption = (value: number): React.ReactNode => {
		const TablePaymentOption: Record<number, React.ReactNode> = {
			0: <PaymentOptionTable type="pos" />,
			1: <PaymentOptionTable type="digital-menu" />,
		};

		return TablePaymentOption[value];
	};

	return (
		<div className="pt-5">
			<h1 className="mb-4 text-l-bold">Payment Options</h1>
			<Tabs value={tabsVal} items={Item} onChange={e => setTabsVal(e)} />

			{GenerateTablePaymentOption(tabsVal)}
		</div>
	);
};

export default PaymentOptionForm;
