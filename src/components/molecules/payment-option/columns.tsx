import {FormatToRupiah} from '@/constants/utils';
import {PaymentMethod} from '@/domain/payment/models';
import {PaymentOptionType} from '@/organisms/form/payment/options';
import {ColumnsType} from 'antd/es/table';

import MoleculesSwitchStatusPaymentMethod from '../moleculesSwitch/payment';

const GenerateTitleColumn = (type: PaymentOptionType) => {
	const TitleColumn = {
		pos: 'Show at POS',
		'digital-menu': 'Show at Digital Menu',
	};

	return TitleColumn[type];
};

const GenerateKeyIndexColumn = (type: PaymentOptionType) => {
	const KeyIndex = {
		pos: 'show_for_pos',
		'digital-menu': 'show_for_dm',
	};

	return KeyIndex[type];
};

const PaymentOptionsColumns = (type: PaymentOptionType) => {
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
			render: (data, item) => {
				const showData =
					item.charge_fee_unit === 'percent'
						? `${data} %`
						: `${FormatToRupiah(data)}`;
				return <p>{showData}</p>;
			},
		},
		{
			title: 'Settlement Date',
			key: 'settlement_info',
			dataIndex: 'settlement_info',
		},
		{
			title: GenerateTitleColumn(type),
			key: GenerateKeyIndexColumn(type),
			dataIndex: GenerateKeyIndexColumn(type),
			render: (data, item) => {
				return (
					<MoleculesSwitchStatusPaymentMethod
						type={type}
						data={data}
						item={item}
					/>
				);
			},
		},
	];

	return columns;
};

export default PaymentOptionsColumns;
