import {PaymentMethod} from '@/domain/payment/models';
import {GetFilterPaymentMethod} from '@/domain/payment/repositories/PaymentRepositories';
import MoleculesSwitchStatusPaymentMethod from '@/molecules/moleculesSwitch/payment';
import {useGetPaymentMethodViewModal} from '@/view/payment/view-models/GetPaymentMethodViewModel';
import {Table} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {useRouter} from 'next/router';
import React, {useMemo} from 'react';

const PaymentOptionForm = () => {
	const {query} = useRouter();
	const {restaurantID} = query;

	const hooksParams: GetFilterPaymentMethod = useMemo(
		() => ({
			search: [
				{field: 'restaurant_uuid', value: restaurantID as string},
				{
					field: 'with_payment_method',
					value: 'true',
				},
				{field: 'is_integration', value: 'true'},
			],
			sort: {field: 'created_at', value: 'desc'},
			page: 1,
			limit: 10,
		}),
		gi[restaurantID],
	);

	const {data: PaymenetMethod, isLoading} =
		useGetPaymentMethodViewModal(hooksParams);

	const columns: ColumnsType<PaymentMethod> = [
		{
			title: 'Payment Method',
			key: 'name',
			dataIndex: 'name',
		},
		{
			title: 'MDR',
			key: 'charge_fee',
			dataIndex: 'charge_fee',
		},
		{
			title: 'Settlement Date',
			key: 'settlement_info',
			dataIndex: 'settlement_info',
		},
		{
			title: 'Show at Digital Menu',
			key: 'is_show',
			dataIndex: 'is_show',
			render: (data, item) => {
				return <MoleculesSwitchStatusPaymentMethod item={item} data={data} />;
			},
		},
	];

	return (
		<div className="pt-5">
			<h1 className="mb-4 text-l-bold">Payment Option</h1>
			<Table
				loading={isLoading}
				columns={columns}
				dataSource={PaymenetMethod}
				pagination={false}
			/>
		</div>
	);
};

export default PaymentOptionForm;
