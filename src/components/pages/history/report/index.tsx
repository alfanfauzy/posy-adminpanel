import AtomTable from '@/atoms/table';
import {TRANSACTION_CATEGORY, TRANSACTION_STATUS} from '@/constants/index';
import {
	DownloadFile,
	FormatToRupiah,
	timeStampConverter,
	TimetoUnix,
} from '@/constants/utils';
import {ReportTransaction} from '@/domain/report-transaction/models';
import {
	GetDownloadTransactionReportInput,
	GetFilterReportTransaction,
} from '@/domain/report-transaction/repositories/ReportTransactionRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {useAccessControl} from '@/hooks/useAccessControl';
import FilterTableReport from '@/organisms/filter/filterTableReport';
import {ObjectSelect} from '@/organisms/form/outlet/entities';
import HeaderContent from '@/templates/header/header-content';
import {useDownloadTransactionReportsViewModel} from '@/view/report-transaction/view-models/GetDownloadTransactionReportsViewModel';
import {useGetReportTransactionViewModal} from '@/view/report-transaction/view-models/GetReportTransactionViewModel';
import {Empty} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {subDays} from 'date-fns';
import React, {useMemo, useState} from 'react';
import {AiOutlineDownload} from 'react-icons/ai';

type TransactionCategoryType = keyof typeof TRANSACTION_CATEGORY;
type TransactionStatusType = keyof typeof TRANSACTION_STATUS;

const HistoryTransactionLayout: React.FC = () => {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [rangeDate, setRangeDate] = useState<[string, string]>(['', '']);

	const {hasAccess} = useAccessControl();

	const [restaurant_uuid, setRestaurant_uuid] = useState<
		ObjectSelect | Record<string, never>
	>({label: 'All', value: 'all'});

	const [restaurant_outlet_uuid, setRestaurant_outlet_uuid] = useState<
		ObjectSelect | Record<string, never>
	>({});

	const [searchParams, setSearchParams] = useState([
		{
			field: 'status',
			value: 'PAID|CANCELLED',
		},
		{
			field: 'transaction_category',
			value: 'DINE_IN|TAKE_AWAY',
		},
		{
			field: 'restaurant_outlet_uuid',
			value: 'all',
		},
	]);

	const hooksParams = useMemo(
		() => ({
			restaurant_uuid: restaurant_uuid.value,
			search: searchParams,
			sort: {field: 'created_at', value: 'desc'},
			page,
			limit,
		}),
		[page, limit, searchParams, restaurant_uuid],
	);

	const today = new Date();
	const dateBefore30Days = subDays(today, 30);

	const paramsDownload = useMemo(() => {
		return {
			start_date:
				rangeDate[0] === ''
					? TimetoUnix(dateBefore30Days).toString()
					: TimetoUnix(rangeDate[0]).toString(),
			end_date:
				rangeDate[1] === ''
					? TimetoUnix(today).toString()
					: TimetoUnix(rangeDate[1]).toString(),
			restaurant_uuid: restaurant_uuid.value,
			filter: searchParams,
		};
	}, [JSON.stringify(searchParams), restaurant_uuid]);

	const {
		data: ListReportTransaction,
		isLoading,
		pagination,
	} = useGetReportTransactionViewModal(
		hooksParams as GetFilterReportTransaction,
	);

	const {downloadReport, isLoading: isLoadingDownloadReport} =
		useDownloadTransactionReportsViewModel({
			onSuccess(response) {
				const {data: responseDownloadReport} = response as Response<string>;
				DownloadFile(responseDownloadReport, `transaction-report`);
			},
		});

	const handleDownloadReport = () => {
		downloadReport(
			paramsDownload as unknown as GetDownloadTransactionReportInput,
		);
	};

	/** Modal Confirmation Action */

	const columns: ColumnsType<ReportTransaction> = [
		{
			title: 'Transaction ID',
			key: 'transaction_id',
			dataIndex: 'transaction_id',
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
					onClick={handleDownloadReport}
					textButton="Export"
					iconElement={<AiOutlineDownload />}
					isLoading={isLoadingDownloadReport}
				/>
			)}
			<FilterTableReport
				searchParams={searchParams}
				setRangeDate={setRangeDate}
				setSearchParams={setSearchParams}
				restaurant_uuid={restaurant_uuid}
				setRestaurant_uuid={setRestaurant_uuid}
				setRestaurant_outlet_uuid={setRestaurant_outlet_uuid}
			/>

			{ListReportTransaction ? (
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
			) : (
				<div className="mt-3 h-auto w-auto rounded-md border border-gray-200 bg-white p-5 shadow-md">
					<Empty description={<p>Please Select Restaurant to Get Report</p>} />
				</div>
			)}
		</div>
	);
};

export default HistoryTransactionLayout;
