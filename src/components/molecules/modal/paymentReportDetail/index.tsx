import {FormatToRupiah} from '@/constants/utils';
import {GetPaymentReportDetailResponse} from '@/data/payment/types/GetPaymentReportDetailType';
import {GetOrdersInput} from '@/domain/order/repositories/GetOrdersRepository';
import {PaymentReportList} from '@/domain/payment/models/payment-report';
import {GetPaymentReportDetailPayload} from '@/domain/payment/repositories/GetPaymentReportDetail';
import {TransactionDetail} from '@/domain/transaction/model/GetTransactionDetailModel';
import {
	GetPaymentSummaryInput,
	PaymentSummary,
} from '@/domain/transaction/repositories/GetPaymentSummaryRepository';
import {PaymentReportOrderList} from '@/molecules/paymentReportDetail/paymentReportOrderList';
import {Category, SettlementStatus} from '@/pages/user/paymentReport/Column';
import {useGetOrdersViewModel} from '@/view/order/view-models/GetOrdersViewModel';
import {useGetPaymentReportDetailViewModel} from '@/view/payment/view-models/GetPaymentReportDetailViewModel';
import {useGetPaymentSummaryViewModel} from '@/view/transaction/view-modals/GetPaymentSummaryViewModel';
import {useGetTransactionDetailViewModel} from '@/view/transaction/view-modals/GetTransactionDetailViewModel';
import {Modal} from 'antd';
import {format, parseISO} from 'date-fns';
import {useRouter} from 'next/router';
import React from 'react';

type PaymentReportDetailProps = {
	isOpen: boolean;
	onClose: () => void;
	selectedPaymentReport: PaymentReportList | undefined;
};

type PaymentReportDetailHeaderProps = Pick<
	PaymentReportDetailProps,
	'selectedPaymentReport'
> & {
	detailTransaction: TransactionDetail | undefined;
};

type PaymentReportSummaryProps = {
	dataPayment: PaymentSummary | undefined;
};

type PaymentReportMDRDetailProps = {
	paymentReportDetail: GetPaymentReportDetailResponse | undefined;
};

const PaymentReportDetailHeader = ({
	detailTransaction,
	selectedPaymentReport,
}: PaymentReportDetailHeaderProps) => {
	const date = parseISO(selectedPaymentReport?.date as string);
	const formattedDate = format(date, 'dd MMM yyyy, hh:mm');

	const customerName = detailTransaction?.customer_name ?? '-';
	const customerTable = detailTransaction?.table_number ?? '-';
	const customerTotalPax = detailTransaction?.total_pax ?? '-';

	return (
		<>
			<aside className="flex flex-row items-center justify-between border-b-2 pt-6 pb-3">
				<div>
					<p className="text-l-bold">{selectedPaymentReport?.transaction_id}</p>
				</div>
				<div className="flex flex-row gap-3">
					<p className="border-r-2 px-4">{customerName}</p>
					<p className="border-r-2 px-4">Table {customerTable}</p>
					<p className="px-4">Pax {customerTotalPax}</p>
				</div>
			</aside>
			<aside className="flex flex-row items-center justify-between pt-6 pb-3">
				<div>
					<p className="text-m-regular">Date</p>
					<p className="text-m-bold">{formattedDate}</p>
				</div>
				<div>
					<p className="text-m-regular">Category</p>
					<p className="text-m-bold">
						{Category[selectedPaymentReport?.category ?? '']}
					</p>
				</div>
				<div>
					<p className="text-m-regular">Payment</p>
					<p className="text-m-bold">{selectedPaymentReport?.payment_method}</p>
				</div>
				<div>
					<p className="text-m-regular">Settlement Status</p>
					<p
						className={`text-m-bold ${
							SettlementStatus[selectedPaymentReport?.setlement_status ?? '']
								.color
						}`}
					>
						{
							SettlementStatus[selectedPaymentReport?.setlement_status ?? '']
								.text
						}
					</p>
				</div>
			</aside>
		</>
	);
};

const PaymentReportSummary = ({dataPayment}: PaymentReportSummaryProps) => {
	return (
		<aside className="my-3 flex flex-col gap-2 rounded-md border p-4">
			<p className="text-m-semibold">Payment Details</p>
			<div className="flex items-center justify-between text-m-regular">
				<p>Subtotal</p>
				<p>{FormatToRupiah(dataPayment?.subtotal_price as number)}</p>
			</div>
			{(dataPayment?.discount_general_percentage as number) > 0 && (
				<div className="flex items-center justify-between text-m-regular">
					<p>Discount</p>
					<p>{FormatToRupiah(dataPayment?.discount_general_price as number)}</p>
				</div>
			)}
			<div className="flex items-center justify-between text-m-regular">
				<p>Service</p>
				<p>
					{FormatToRupiah(
						dataPayment?.tax_and_charge.service_charge_price as number,
					)}
				</p>
			</div>
			<div className="flex items-center justify-between text-m-regular">
				<p>{`Tax ${dataPayment?.tax_and_charge.tax_percentage}%`}</p>
				<p>{FormatToRupiah(dataPayment?.tax_and_charge.tax_price as number)}</p>
			</div>
			<div className="flex items-center justify-between text-m-regular">
				<p>Total</p>
				<p>{FormatToRupiah(dataPayment?.payment_price as number)}</p>
			</div>
		</aside>
	);
};

const PaymentReportMDRDetail = ({
	paymentReportDetail,
}: PaymentReportMDRDetailProps) => {
	const chargeFeeUnit =
		paymentReportDetail?.fee_detail.charge_fee_unit === 'percent' ? '%' : '';

	return (
		<aside className="my-3 flex flex-col gap-2 rounded-md border p-4">
			<p className="text-m-semibold">MDR Details</p>
			<div className="flex items-center justify-between text-m-regular">
				<p>Total ammount</p>
				<p>{FormatToRupiah(paymentReportDetail?.amount as number)}</p>
			</div>
			<div className="flex items-center justify-between text-m-regular">
				<p>
					MDR ({paymentReportDetail?.fee_detail.charge_fee} {chargeFeeUnit})
				</p>
				<p>
					-
					{FormatToRupiah(
						paymentReportDetail?.fee_detail.charge_amount as number,
					)}
				</p>
			</div>
			<div className="flex items-center justify-between text-m-regular">
				<p>VAT</p>
				<p>
					-
					{FormatToRupiah(paymentReportDetail?.fee_detail.vat_amount as number)}
				</p>
			</div>
			<div className="flex items-center justify-between text-m-bold">
				<p>Amount received</p>
				<p>{FormatToRupiah(paymentReportDetail?.net_amount as number)}</p>
			</div>
		</aside>
	);
};

const PaymentReportWithdrawDetail = ({
	paymentReportDetail,
}: PaymentReportMDRDetailProps) => {
	return (
		<aside className="my-3 flex flex-col gap-2 rounded-md border p-4">
			<p className="text-m-semibold">Details</p>
			<div className="flex items-center justify-between text-m-regular">
				<p>Withdrawal ammount</p>
				<p>{FormatToRupiah(paymentReportDetail?.net_amount as number)}</p>
			</div>
			<div className="flex items-center justify-between text-m-regular">
				<p>Withdrawal fee</p>
				<p>
					-
					{FormatToRupiah(
						paymentReportDetail?.fee_detail.charge_amount as number,
					)}
				</p>
			</div>
			<div className="flex items-center justify-between text-m-regular">
				<p>Withdrawal VAT</p>
				<p>
					-
					{FormatToRupiah(paymentReportDetail?.fee_detail.vat_amount as number)}
				</p>
			</div>
			<div className="flex items-center justify-between text-m-bold">
				<p>Amount received</p>
				<p>{FormatToRupiah(paymentReportDetail?.amount as number)}</p>
			</div>
		</aside>
	);
};

const PaymentReportDetail = ({
	isOpen,
	onClose,
	selectedPaymentReport,
}: PaymentReportDetailProps) => {
	const {query} = useRouter();
	const {restaurantID} = query;

	const isTransaction = selectedPaymentReport?.category === 'TRANSACTION';

	const {data: detailTransaction} = useGetTransactionDetailViewModel(
		selectedPaymentReport?.reference_id as string,
	);

	const paramGetOrder: GetOrdersInput = {
		transaction_uuid: selectedPaymentReport?.reference_id as string,
	};

	const paramPaymentSummary: GetPaymentSummaryInput = {
		transaction_uuid: selectedPaymentReport?.reference_id as string,
		payload: {
			restaurant_uuid: restaurantID as string,
			restaurant_outlet_uuid:
				detailTransaction?.restaurant_outlet_uuid as string,
		},
	};

	const paramPaymentReportDetail: GetPaymentReportDetailPayload = {
		restaurant_uuid: restaurantID as string,
		transaction_id: selectedPaymentReport?.id as string,
	};

	const {data: OrderDetail} = useGetOrdersViewModel(paramGetOrder, {
		enabled: isOpen && selectedPaymentReport?.category !== 'WITHDRAWAL',
	});

	const {data: dataPayment} = useGetPaymentSummaryViewModel(
		paramPaymentSummary,
		{
			enabled: isOpen,
		},
	);

	const {data: paymentReportDetail} = useGetPaymentReportDetailViewModel(
		paramPaymentReportDetail,
		{
			enabled: isOpen && !!selectedPaymentReport,
		},
	);

	return (
		<Modal open={isOpen} onCancel={onClose} footer={null} width={700}>
			<PaymentReportDetailHeader
				selectedPaymentReport={selectedPaymentReport}
				detailTransaction={detailTransaction}
			/>

			{isTransaction && (
				<>
					<PaymentReportOrderList orderDetail={OrderDetail} />
					<PaymentReportSummary dataPayment={dataPayment} />
				</>
			)}

			{isTransaction ? (
				<PaymentReportMDRDetail paymentReportDetail={paymentReportDetail} />
			) : (
				<PaymentReportWithdrawDetail
					paymentReportDetail={paymentReportDetail}
				/>
			)}
		</Modal>
	);
};

export default PaymentReportDetail;
