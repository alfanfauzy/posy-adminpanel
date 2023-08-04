import {
	checkAvailableField,
	deleteFieldParams,
	updateValueParam,
} from '@/constants/utils/search';
import {GetFilterOutletInput} from '@/domain/outlet/repositories/OutletRepositories';
import {PaymentReportList} from '@/domain/payment/models/payment-report';
import {ObjectSelect} from '@/organisms/form/outlet/entities';
import {RangeValue} from '@/pages/user/paymentReport';
import {useGetOutletViewModal} from '@/view/outlet/view-models/GetOutletViewModel';
import {DatePicker, Input} from 'antd';
import dayjs, {Dayjs} from 'dayjs';
import {useRouter} from 'next/router';
import React, {useMemo} from 'react';
import {AiOutlineSearch} from 'react-icons/ai';
import Select from 'react-select';

const {RangePicker} = DatePicker;

type FilterTablePaymentReportProps = {
	rangeDate: RangeValue;
	setRangeDate: React.Dispatch<React.SetStateAction<RangeValue>>;
	setAfterId: React.Dispatch<React.SetStateAction<string | null>>;
	searchReport: Array<{
		field: string;
		value: string;
	}>;
	setSearchReport: React.Dispatch<
		React.SetStateAction<
			Array<{
				field: string;
				value: string;
			}>
		>
	>;
	setDataReport: React.Dispatch<React.SetStateAction<Array<PaymentReportList>>>;
};

const CategoryOptions = [
	{
		label: 'Payment',
		value: 'TRANSACTION',
	},
	{
		label: 'Withdraw',
		value: 'WITHDRAWAL',
	},
];

const StatusOptions = [
	{
		label: 'Success',
		value: 'SETTLED',
	},
	{
		label: 'Pending',
		value: 'PENDING',
	},
];

const PaymentMethodOptions = [
	{
		label: 'Ovo',
		value: 'OVO',
	},
	{
		label: 'Dana',
		value: 'DANA',
	},
	{
		label: 'Link Aja',
		value: 'LINKAJA',
	},
];

const FilterTablePaymentReport = ({
	rangeDate,
	setRangeDate,
	setAfterId,
	searchReport,
	setSearchReport,
	setDataReport,
}: FilterTablePaymentReportProps) => {
	const {query} = useRouter();
	const {restaurantID} = query;

	const hooksOutletRestaurant: GetFilterOutletInput = useMemo(() => {
		return {
			search: [{field: 'restaurant_uuid', value: restaurantID as string}],
			sort: {field: 'created_at', value: 'desc'},
			page: 1,
			limit: 0,
		};
	}, [restaurantID]);

	const {data: ListDataOutlet, isLoading: isLoadingOutlet} =
		useGetOutletViewModal(hooksOutletRestaurant, {
			enabled: !!restaurantID,
		});

	const OutletSelectOptions = useMemo(() => {
		if (!ListDataOutlet) return [];

		const mapToOutletSelect = ListDataOutlet.map(outlet => ({
			label: outlet.outlet_name,
			value: outlet.outlet_name,
		}));

		return mapToOutletSelect;
	}, [ListDataOutlet]);

	const disabledDate = (current: Dayjs) => {
		return current && current > dayjs().endOf('day');
	};

	const handleChangeSelect = (
		valueSearch: ObjectSelect,
		fieldChecking: string,
	) => {
		// If value is null, remove the field
		if (valueSearch === null) {
			const removeSearch = deleteFieldParams({searchReport, fieldChecking});

			setSearchReport(removeSearch);
			return;
		}

		const fieldIndex = checkAvailableField({searchReport, fieldChecking});

		// If field available, update value from the same field
		if (fieldIndex !== -1) {
			if (valueSearch?.value === '' || valueSearch === null) {
				const removeSearch = deleteFieldParams({searchReport, fieldChecking});

				setSearchReport(removeSearch);
				return;
			}

			const updateSearch = updateValueParam({
				searchReport,
				fieldChecking,
				value: valueSearch?.value,
			});

			setSearchReport(updateSearch);
		} else {
			// If field doesn't available, create and add to state
			setSearchReport(prevState => [
				...prevState,
				{
					field: fieldChecking,
					value: valueSearch.value,
				},
			]);
		}
	};

	const handleChangeInput = (valueSearch: string, fieldChecking: string) => {
		// If value is null, remove the field
		if (valueSearch === null) {
			const removeSearch = deleteFieldParams({searchReport, fieldChecking});

			setSearchReport(removeSearch);
			return;
		}

		const fieldIndex = checkAvailableField({searchReport, fieldChecking});

		// If field available, update value from the same field
		if (fieldIndex !== -1) {
			if (valueSearch === '' || valueSearch === null) {
				const removeSearch = deleteFieldParams({searchReport, fieldChecking});

				setSearchReport(removeSearch);
				return;
			}

			const updateSearch = updateValueParam({
				searchReport,
				fieldChecking,
				value: valueSearch,
			});

			setSearchReport(updateSearch);
		} else {
			// If field doesn't available, create and add to state
			setSearchReport(prevState => [
				...prevState,
				{
					field: fieldChecking,
					value: valueSearch,
				},
			]);
		}
	};

	return (
		<div className="mb-2 grid grid-cols-3 items-start gap-3 pb-3">
			<div className="flex flex-col gap-1">
				<label className="text-m-medium">Date</label>
				<RangePicker
					onChange={val => {
						setRangeDate(val);
						setDataReport([]);
					}}
					className="h-[42px] px-3"
					allowClear={false}
					disabledDate={disabledDate}
					defaultValue={rangeDate}
					onCalendarChange={val => {
						setRangeDate(val);
						setAfterId(null);
					}}
				/>
			</div>
			<div>
				<label className="mb-1 block text-m-regular">Outlet</label>
				<Select
					onChange={e => handleChangeSelect(e as ObjectSelect, 'outlet')}
					isLoading={isLoadingOutlet}
					options={OutletSelectOptions}
					placeholder="ex: Select Outlet"
					isClearable
				/>
			</div>
			<div>
				<label className="mb-1 block text-m-regular">Category</label>
				<Select
					onChange={e => handleChangeSelect(e as ObjectSelect, 'category')}
					options={CategoryOptions}
					placeholder="ex: Select Category"
					isClearable
				/>
			</div>
			<div>
				<label className="mb-1 block text-m-regular">Payment Method</label>
				<Select
					onChange={e =>
						handleChangeSelect(e as ObjectSelect, 'payment_method')
					}
					options={PaymentMethodOptions}
					placeholder="ex: Select Status"
					isClearable
				/>
			</div>
			<div>
				<label className="mb-1 block text-m-regular">Status</label>
				<Select
					onChange={e =>
						handleChangeSelect(e as ObjectSelect, 'setlement_status')
					}
					options={StatusOptions}
					placeholder="ex: Select Status"
					isClearable
				/>
			</div>
			<div>
				<label className="mb-1 block text-m-regular">Transaction Id</label>
				<Input
					placeholder="Transaction ID"
					className="p-[7px]"
					prefix={<AiOutlineSearch />}
					onChange={e => handleChangeInput(e.target.value, 'transaction_id')}
				/>
			</div>
		</div>
	);
};

export default FilterTablePaymentReport;
