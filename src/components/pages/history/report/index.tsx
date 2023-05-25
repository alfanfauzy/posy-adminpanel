import AtomTable from '@/atoms/table';
import {TRANSACTION_CATEGORY, TRANSACTION_STATUS} from '@/constants/index';
import {FormatToRupiah, timeStampConverter} from '@/constants/utils';
import {ReportTransaction} from '@/domain/report-transaction/models';
import {GetFilterReportTransaction} from '@/domain/report-transaction/repositories/ReportTransactionRepository';
import {useAccessControl} from '@/hooks/useAccessControl';
import HeaderContent from '@/templates/header/header-content';
import {useGetReportTransactionViewModal} from '@/view/report-transaction/view-models/GetReportTransactionViewModel';
import type {ColumnsType} from 'antd/es/table';
import React, {useMemo, useState} from 'react';
import {AiOutlineDownload} from 'react-icons/ai';

type TransactionCategoryType = keyof typeof TRANSACTION_CATEGORY;
type TransactionStatusType = keyof typeof TRANSACTION_STATUS;

const HistoryTransactionLayout: React.FC = () => {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);

	const {hasAccess} = useAccessControl();

	const hooksParams: GetFilterReportTransaction = useMemo(
		() => ({
			search: [],
			sort: {field: 'created_at', value: 'desc'},
			page,
			limit,
		}),
		[page, limit],
	);

	const {
		data: ListReportTransaction,
		isLoading,
		pagination,
	} = useGetReportTransactionViewModal(hooksParams);

	/** Modal Confirmation Action */

	const columns: ColumnsType<ReportTransaction> = [
		{
			title: 'Transaction ID',
			key: 'transaction_id',
			dataIndex: 'transaction_id',
			fixed: 'left',
			width: 230,
		},
		{
			title: 'Date',
			key: 'date',
			dataIndex: 'date',
			render: (dataValue, record) =>
				timeStampConverter(dataValue, 'DD MMM YYYY HH:mm'),
			width: 180,
		},
		{
			title: 'Restaurant Name',
			key: 'restaurant_name',
			dataIndex: 'restaurant_name',
			width: 200,
		},
		{
			title: 'Outlet Name',
			key: 'outlet_name',
			dataIndex: 'outlet_name',
			width: 160,
		},
		{
			title: 'Cashier',
			key: 'cashier',
			dataIndex: 'cashier',
			width: 160,
		},
		{
			title: 'Waiter',
			key: 'waiter',
			dataIndex: 'waiter',
			width: 160,
		},
		{
			title: 'Type of Order',
			key: 'type_of_order',
			dataIndex: 'type_of_order',
			width: 150,
			render: (dataValue: TransactionCategoryType) => {
				return TRANSACTION_CATEGORY[dataValue];
			},
		},
		{
			title: 'Payment Method',
			key: 'payment_method',
			dataIndex: 'payment_method',
			width: 200,
		},
		{
			title: 'Status',
			key: 'status',
			dataIndex: 'status',
			render: (dataValue: TransactionStatusType) => {
				return (
					<p style={{color: TRANSACTION_STATUS[dataValue]?.color}}>
						{TRANSACTION_STATUS[dataValue]?.label}
					</p>
				);
			},
			width: 150,
		},
		{
			title: 'Amount',
			key: 'amount',
			dataIndex: 'amount',
			render: dataValue => {
				const ammount = FormatToRupiah(dataValue);
				if (ammount.includes('-')) {
					return <p className="text-red-caution">{ammount}</p>;
				}

				return <p className="text-green-success">{ammount}</p>;
			},
		},
	];

	return (
		<div className="w-[1050px]">
			{hasAccess('report:transaction') && (
				<HeaderContent
					flexEnd
					onClick={() => console.log('Download')}
					textButton="Export"
					iconElement={<AiOutlineDownload />}
				/>
			)}
			<AtomTable
				isLoading={isLoading}
				columns={columns}
				onChangePaginationItem={(e: {value: number}) => setLimit(e.value)}
				limitSize={limit}
				pagination={{
					current: page,
					pageSize: limit,
					total: pagination?.total_objs,
					onChange: setPage,
				}}
				bordered
				dataSource={ListReportTransaction}
				scroll={{x: 1780}}
			/>
		</div>
	);
};

export default HistoryTransactionLayout;