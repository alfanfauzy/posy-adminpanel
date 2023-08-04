import {
	GetFilterPaymentMethod,
	PayloadPaymentMethod,
} from '@/domain/payment/repositories/PaymentRepositories';
import {Search} from '@/domain/vo/BaseInput';
import {PaymentOptionType} from '@/organisms/form/payment/options';
import {useGetPaymentMethodViewModal} from '@/view/payment/view-models/GetPaymentMethodViewModel';
import {Table} from 'antd';
import {useRouter} from 'next/router';
import React from 'react';

import PaymentOptionsColumns from './columns';

type PaymentOptionTableProps = {
	type: PaymentOptionType;
};

type GenerateSearchParamProps = {
	restaurantID: string;
	type: PaymentOptionType;
};

const GenerateSearchParam = ({
	type,
}: GenerateSearchParamProps): GetFilterPaymentMethod => {
	const search: Array<
		Search<
			| 'restaurant_uuid'
			| 'is_integration'
			| 'is_show'
			| 'show_for_pos'
			| 'show_for_dm'
		>
	> = [
		{field: 'is_integration', value: 'true'},
		{field: 'is_show', value: 'true'},
	];

	if (type === 'digital-menu') {
		search.push({field: 'show_for_dm', value: 'true'});
	} else {
		search.push({field: 'show_for_pos', value: 'true'});
	}

	return {
		search: search,
		sort: {field: 'created_at', value: 'desc'},
		page: 1,
		limit: 10,
	};
};

const PaymentOptionTable = ({type}: PaymentOptionTableProps) => {
	const {query} = useRouter();
	const {restaurantID} = query;

	const payloadSearch: GenerateSearchParamProps = {
		restaurantID: restaurantID as string,
		type,
	};

	const paramPaymentMethod: PayloadPaymentMethod = {
		payload: GenerateSearchParam(payloadSearch),
		restaurant_uuid: restaurantID as string,
	};

	const {data: PaymenetMethod, isLoading} =
		useGetPaymentMethodViewModal(paramPaymentMethod);

	return (
		<Table
			loading={isLoading}
			columns={PaymentOptionsColumns(type)}
			dataSource={PaymenetMethod}
			pagination={false}
		/>
	);
};

export default PaymentOptionTable;
