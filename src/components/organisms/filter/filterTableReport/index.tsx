import {TimetoUnix} from '@/constants/utils';
import {mapToOutletSelectObject} from '@/data/outlet/mappers/OutletMapper';
import {mapToPaymentMethodCategorySelectObject} from '@/data/payment/mappers/PaymentMethodMapper';
import {mapToRestaurantSelectObject} from '@/data/restaurant/mappers/RestaurantMapper';
import {GetFilterOutletInput} from '@/domain/outlet/repositories/OutletRepositories';
import {GetFilterPaymentMethodCategory} from '@/domain/payment/repositories/PaymentRepositories';
import {GetFilterRestaurantInput} from '@/domain/restaurant/repositories/RestaurantRepository';
import {ObjectSelect} from '@/organisms/form/outlet/entities';
import {useGetOutletViewModal} from '@/view/outlet/view-models/GetOutletViewModel';
import {useGetPaymentMethodCategoryViewModal} from '@/view/payment/view-models/GetPaymentMethodCategoryViewModel';
import {useGetRestaurantViewModal} from '@/view/restaurant/view-models/GetRestaurantViewModel';
import {DatePicker, TreeSelect} from 'antd';
import type {RangePickerProps} from 'antd/es/date-picker';
import dayjs from 'dayjs';
import {Select} from 'posy-fnb-core';
import React, {useMemo, useState} from 'react';

const {RangePicker} = DatePicker;

type FilterTableReportProps = {
	searchParams: Array<{
		field: string;
		value: string;
	}>;
	setRangeDate: React.Dispatch<React.SetStateAction<[string, string]>>;
	setSearchParams: React.Dispatch<
		React.SetStateAction<
			Array<{
				field: string;
				value: string;
			}>
		>
	>;
	restaurant_uuid: ObjectSelect | Record<string, never>;
	setRestaurant_uuid: React.Dispatch<
		React.SetStateAction<ObjectSelect | Record<string, never>>
	>;
	setRestaurant_outlet_uuid: React.Dispatch<
		React.SetStateAction<ObjectSelect | Record<string, never>>
	>;
};

const OPTIONS_STATUS = [
	{
		label: 'Paid',
		value: 'PAID',
	},
	{
		label: 'Cancel',
		value: 'CANCELLED',
	},
	{
		label: 'Refund',
		value: 'REFUND',
	},
];

const TYPE_OF_ORDER = [
	{
		label: 'Dine In',
		value: 'DINE_IN',
	},
	{
		label: 'Take Away',
		value: 'TAKE_AWAY',
	},
];

const FilterTableReport = ({
	searchParams,
	setSearchParams,
	setRangeDate,
	restaurant_uuid,
	setRestaurant_uuid,
	setRestaurant_outlet_uuid,
}: FilterTableReportProps) => {
	const [selectedTreeValue, setSelectedTreeValue] = useState<string>();
	const [objectPaymentMethod, setObjectPaymentMethod] = useState<
		Array<{
			value: string;
			title: string;
			is_integration: boolean;
			children: Array<{value: string; title: string}>;
		}>
	>([]);
	const hooksRoleRestaurant: GetFilterRestaurantInput = {
		search: [],
		sort: {field: 'created_at', value: 'desc'},
		page: 1,
		limit: 0,
	};

	const paramsPaymentMethodCategpory: GetFilterPaymentMethodCategory = {
		search: [
			{
				field: 'with_payment_method',
				value: 'true',
			},
		],
		sort: {field: 'created_at', value: 'desc'},
		page: 1,
		limit: 10,
	};

	const {data: ListDataRestaurant, isLoading: isLoadingRestaurant} =
		useGetRestaurantViewModal(hooksRoleRestaurant);

	const RestaurantSelectOptions = useMemo(() => {
		if (!ListDataRestaurant) return [];

		const mapToRestaurantSelect =
			mapToRestaurantSelectObject(ListDataRestaurant);

		return mapToRestaurantSelect;
	}, [ListDataRestaurant]);

	const hooksOutletRestaurant: GetFilterOutletInput = useMemo(() => {
		return {
			search: [{field: 'restaurant_uuid', value: restaurant_uuid.value}],
			sort: {field: 'created_at', value: 'desc'},
			page: 1,
			limit: 0,
		};
	}, [restaurant_uuid]);

	const {data: ListDataOutlet, isLoading: isLoadingOutlet} =
		useGetOutletViewModal(hooksOutletRestaurant, {
			enabled: !!restaurant_uuid && !!restaurant_uuid.value,
		});

	const OutletSelectOptions = useMemo(() => {
		if (!ListDataOutlet) return [];

		const mapToOutletSelect = mapToOutletSelectObject(ListDataOutlet);

		return mapToOutletSelect;
	}, [ListDataOutlet]);

	const {isLoading: isLoadingPaymentMethod} =
		useGetPaymentMethodCategoryViewModal(paramsPaymentMethodCategpory, {
			onSuccess(data) {
				const paymentMethodObject = mapToPaymentMethodCategorySelectObject(
					data.data.objs,
				);

				setObjectPaymentMethod(paymentMethodObject);
			},
		});

	const checkAvailableField = (fieldChecking: string) => {
		let fieldIndex = -1;
		searchParams.forEach((dataObject, index) => {
			if (dataObject.field === fieldChecking) {
				fieldIndex = index;
			}
		});

		return fieldIndex;
	};

	const deleteFieldParams = (field: string) => {
		const removeArray = searchParams.filter(
			dataObject => dataObject.field !== field,
		);

		return removeArray;
	};

	const updateValueParam = (field: string, value: string) => {
		const updatedSearchParams = searchParams.map(param => {
			if (param.field === field) {
				// Update the value of the 'created_at' field here
				return {...param, value: value};
			}
			return param;
		});

		return updatedSearchParams;
	};

	const handleChangeRangePicker = (dateStrings: [string, string]) => {
		setRangeDate(dateStrings);
		const startDate = TimetoUnix(dateStrings[0]);
		const endDate = TimetoUnix(dateStrings[1]);
		const fieldIndex = checkAvailableField('created_at');

		if (fieldIndex !== -1) {
			if (dateStrings[0] === '' && dateStrings[1] === '') {
				const removeSearch = deleteFieldParams('created_at');
				setSearchParams(removeSearch);
				return;
			}

			const updateSearch = updateValueParam(
				'created_at',
				`${startDate}&&${endDate}`,
			);

			setSearchParams(updateSearch);
		} else {
			// 'created_at' field does not exist, add a new data object
			setSearchParams(prevState => [
				...prevState,
				{
					field: 'created_at',
					value: `${startDate}&&${endDate}`,
				},
			]);
		}
	};

	const handleChangeSelect = (valueSearch: ObjectSelect, field: string) => {
		if (valueSearch === null) {
			const removeSearch = deleteFieldParams(field);

			switch (field) {
				case 'status':
					setSearchParams([
						...removeSearch,
						{field: 'status', value: 'PAID|CANCELLED'},
					]);
					return;

				case 'transaction_category':
					setSearchParams([
						...removeSearch,
						{field: 'transaction_category', value: 'DINE_IN|TAKE_AWAY'},
					]);
					return;

				default:
					break;
			}

			setSearchParams(removeSearch);
			return;
		}

		const fieldIndex = checkAvailableField(field);

		if (fieldIndex !== -1) {
			if (valueSearch?.value === '' || valueSearch === null) {
				const removeSearch = deleteFieldParams(field);

				setSearchParams(removeSearch);
				return;
			}

			const updateSearch = updateValueParam(field, valueSearch.value);

			setSearchParams(updateSearch);
		} else {
			// 'created_at' field does not exist, add a new data object
			setSearchParams(prevState => [
				...prevState,
				{
					field: field,
					value: valueSearch.value,
				},
			]);
		}
	};

	const handleChangePaymentMethod = (valueSelected: any) => {
		const field = 'payment_method_uuid';
		if (valueSelected.length === 0) {
			const removeSearch = deleteFieldParams(field);
			setSearchParams(removeSearch);
			return;
		}

		const fieldIndex = checkAvailableField(field);

		if (fieldIndex !== -1) {
			if (valueSelected.length === 0) {
				const removeSearch = deleteFieldParams(field);

				setSearchParams(removeSearch);
				return;
			}

			const updateSearch = updateValueParam(field, valueSelected.join('|'));

			setSearchParams(updateSearch);
		} else {
			// 'created_at' field does not exist, add a new data object
			setSearchParams(prevState => [
				...prevState,
				{
					field: field,
					value: valueSelected.join('|'),
				},
			]);
		}
	};

	const integrationOptions = objectPaymentMethod.filter(
		node => node.is_integration,
	);

	const nonIntegrationOptions = objectPaymentMethod.filter(
		node => !node.is_integration,
	);

	// eslint-disable-next-line arrow-body-style
	const disabledDate: RangePickerProps['disabledDate'] = current => {
		// Can not select days before today and today
		return current && current >= dayjs().endOf('day');
	};

	return (
		<div className="mb-2 grid grid-cols-3 gap-3 pb-3">
			<div>
				<Select
					onChange={e => {
						setRestaurant_uuid(e);
					}}
					options={RestaurantSelectOptions}
					isLoading={isLoadingRestaurant}
					labelText="Restaurant:"
					placeholder="ex: Select Restaurant"
					className="flex items-center justify-center"
				/>
			</div>
			<div>
				<Select
					onChange={e => {
						setRestaurant_outlet_uuid(e);
						handleChangeSelect(e, 'restaurant_outlet_uuid');
					}}
					isLoading={isLoadingOutlet}
					options={OutletSelectOptions}
					labelText="Outlet:"
					placeholder="ex: Select Outlet"
					className="flex items-center justify-center"
				/>
			</div>
			<div className="flex flex-col gap-1">
				<label className="text-m-medium">Date</label>
				<RangePicker
					onChange={(_, dateStrings) => handleChangeRangePicker(dateStrings)}
					className="h-[42px] px-3"
					allowClear={false}
					disabledDate={disabledDate}
					defaultValue={[dayjs().subtract(1, 'month'), dayjs()]}
				/>
			</div>
			<div>
				<Select
					onChange={e => {
						handleChangeSelect(e, 'status');
					}}
					isClearable
					options={OPTIONS_STATUS}
					labelText="Status:"
					placeholder="ex: Select Status"
					className="flex items-center justify-center"
				/>
			</div>
			<div>
				<Select
					onChange={e => {
						handleChangeSelect(e, 'transaction_category');
					}}
					isClearable
					options={TYPE_OF_ORDER}
					labelText="Type of Order:"
					placeholder="ex: Select Type of Order"
					className="flex items-center justify-center"
				/>
			</div>
			<div>
				<label className="mb-1 block text-m-regular">Payment Method:</label>
				<TreeSelect
					loading={isLoadingPaymentMethod}
					showSearch
					className="h-8 text-m-regular"
					style={{width: '100%'}}
					value={selectedTreeValue}
					dropdownStyle={{
						maxHeight: 400,
						overflow: 'auto',
						paddingBottom: 10,
					}}
					placeholder="Please select"
					allowClear
					multiple
					treeDefaultExpandAll
					onChange={e => {
						setSelectedTreeValue(e);
						handleChangePaymentMethod(e);
					}}
					maxTagCount={2}
					maxTagPlaceholder={omittedValues =>
						`+ ${omittedValues.length} Payment Selected ...`
					}
					treeData={[
						{
							title: (
								<p className="w-[300px] pb-4 text-xl-semibold text-black">
									Payment Method:
								</p>
							),
							disabled: true,
							checkable: false,
						},
						{
							title: (
								<p className="w-[300px] border-t pt-2 text-l-semibold text-black">
									Payment Integration
								</p>
							),
							disabled: true,
							checkable: false,
						},
						...integrationOptions,
						{
							title: (
								<p className="w-[300px] border-t pt-4 text-l-semibold text-black">
									Manual Input
								</p>
							),
							value: 'xxx',
							disableCheckbox: true,
							disabled: true,
							checkable: false,
						},
						...nonIntegrationOptions,
					]}
					treeCheckable
				/>
			</div>
		</div>
	);
};

export default FilterTableReport;
