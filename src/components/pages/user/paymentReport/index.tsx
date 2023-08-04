import {mapToPaymentReportList} from '@/data/payment/mappers/PaymentMethodMapper';
import {GetPaymentReportKey} from '@/data/payment/sources/GetPaymentReportListQuery';
import {PaymentReportList} from '@/domain/payment/models/payment-report';
import {GetPaymentReportFilter} from '@/domain/payment/repositories/GetPaymentReportList';
import {queryClient} from '@/hooks/react-query';
import useToggle from '@/hooks/useToggle';
import PaymentReportDetail from '@/molecules/modal/paymentReportDetail';
import FilterTablePaymentReport from '@/organisms/filter/filterTablePaymentReport';
import {useGetPaymentReportViewModel} from '@/view/payment/view-models/GetPaymentReportViewModel';
import {Table} from 'antd';
import dayjs, {Dayjs} from 'dayjs';
import {useRouter} from 'next/router';
import InformationIcon from 'public/icon/information';
import React, {useEffect, useMemo, useState} from 'react';

import PaymentReportColumn from './Column';

export type RangeValue = [Dayjs | null, Dayjs | null] | null;

const PaymentReportLayout = () => {
	const {query} = useRouter();
	const {restaurantID} = query;

	const [dataReport, setDataReport] = useState<Array<PaymentReportList>>([]);
	const [loadingTable, setLoadingTable] = useState<boolean>(true);
	const [rangeDate, setRangeDate] = useState<RangeValue>([
		dayjs().subtract(6, 'days'),
		dayjs(),
	]);
	const [searchReport, setSearchReport] = useState<
		Array<{field: string; value: string}>
	>([]);
	const [afterId, setAfterId] = useState<string | null>(null);
	const {value: isOpenModal, toggle: handleOpenModal} = useToggle(false);
	const [selectedPaymentReport, setSelectedPaymentReport] =
		useState<PaymentReportList>();

	const paramQuery: GetPaymentReportFilter = useMemo(
		() => ({
			restaurant_uuid: (restaurantID as string) || '',
			start_date: dayjs(rangeDate?.[0]).format('YYYY-MM-DD'),
			end_date: dayjs(rangeDate?.[1]).format('YYYY-MM-DD'),
			limit: 10,
			after_id: afterId as string,
		}),
		[afterId, restaurantID, rangeDate],
	);

	const {
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading: isLoadingPaymentReport,
	} = useGetPaymentReportViewModel(paramQuery, {
		onSuccess(response) {
			const paymentReportMapper = mapToPaymentReportList(
				response.pages[0].data,
			);

			const allItems = paymentReportMapper.data?.flatMap(page => page);

			setDataReport(currentState => currentState.concat(allItems));

			setLoadingTable(false);
		},
		getNextPageParam: lastPage => {
			if (lastPage?.data?.has_more) {
				const linkNextPage =
					lastPage.data.links.map(link => link.href)[0] ?? undefined;

				const params = new URLSearchParams(
					linkNextPage.slice(linkNextPage.indexOf('?') + 1),
				);
				const afterID = params.get('after_id');

				setAfterId(afterID);
				return afterID;
			}

			return undefined;
		},
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (hasNextPage) {
			fetchNextPage();
		}
	}, [fetchNextPage, hasNextPage]);

	useEffect(() => {
		queryClient.resetQueries(GetPaymentReportKey);
	}, []);

	const filterData = useMemo(() => {
		// If doesn't have any search return data Report
		if (searchReport.length === 0) return dataReport;

		return dataReport.filter(item => {
			return searchReport.every(filter => {
				// if filter field is transaction_id filter the value with includes
				if (filter.field === 'transaction_id') {
					return item.transaction_id.includes(filter.value.toUpperCase());
				}
				return item[filter.field as keyof PaymentReportList] === filter.value;
			});
		});
	}, [dataReport, searchReport]);

	return (
		<>
			<div className="mt-10 w-auto justify-between gap-5 rounded-tr-md rounded-tl-md border border-gray-200 bg-white p-4">
				<h2 className="mb-4 text-l-bold">Payment Report</h2>
				<FilterTablePaymentReport
					rangeDate={rangeDate}
					setRangeDate={setRangeDate}
					setDataReport={setDataReport}
					setAfterId={setAfterId}
					searchReport={searchReport}
					setSearchReport={setSearchReport}
				/>
				<Table
					columns={PaymentReportColumn({
						setSelectedPaymentReport,
						handleOpenModal,
					})}
					dataSource={filterData}
					loading={loadingTable || isFetchingNextPage || isLoadingPaymentReport}
					pagination={false}
				/>
			</div>
			<section className="flex items-center gap-1 rounded-br-md rounded-bl-md border p-4">
				<div className="text-secondary-main">
					<InformationIcon color="#654DE4" />
				</div>
				<p className="text-m-semibold">
					This report only shows the transaction for the last 7 days
				</p>
			</section>

			{isOpenModal && (
				<PaymentReportDetail
					isOpen={isOpenModal}
					onClose={handleOpenModal}
					key={selectedPaymentReport?.id}
					selectedPaymentReport={selectedPaymentReport}
				/>
			)}
		</>
	);
};

export default PaymentReportLayout;
