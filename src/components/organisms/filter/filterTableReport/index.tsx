import {TimetoUnix} from '@/constants/utils';
import {mapToOutletSelectObject} from '@/data/outlet/mappers/OutletMapper';
import {mapToRestaurantSelectObject} from '@/data/restaurant/mappers/RestaurantMapper';
import {GetFilterOutletInput} from '@/domain/outlet/repositories/OutletRepositories';
import {GetFilterRestaurantInput} from '@/domain/restaurant/repositories/RestaurantRepository';
import {ObjectSelect} from '@/organisms/form/outlet/entities';
import {useGetOutletViewModal} from '@/view/outlet/view-models/GetOutletViewModel';
import {useGetRestaurantViewModal} from '@/view/restaurant/view-models/GetRestaurantViewModel';
import {DatePicker} from 'antd';
import {Select} from 'posy-fnb-core';
import React, {useMemo, useRef} from 'react';

const {RangePicker} = DatePicker;

type FilterTableReportProps = {
	searchParams: Array<{
		field: string;
		value: string;
	}>;
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
};

const FilterTableReport = ({
	searchParams,
	setSearchParams,
	restaurant_uuid,
	setRestaurant_uuid,
}: FilterTableReportProps) => {
	const hooksRoleRestaurant: GetFilterRestaurantInput = {
		search: [],
		sort: {field: 'created_at', value: 'desc'},
		page: 1,
		limit: 0,
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

	const refSelectOutlet: React.MutableRefObject<any> = useRef();

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
		const startDate = TimetoUnix(dateStrings[0]);
		const endDate = TimetoUnix(dateStrings[1]);
		const fieldIndex = checkAvailableField('created_at');

		if (fieldIndex !== -1) {
			if (dateStrings[0] === '' && dateStrings[1] === '') {
				const removeSearch = deleteFieldParams('created_at');
				setSearchParams(removeSearch);
			}

			const updateSearch = updateValueParam(
				'created_at',
				`${startDate}&${endDate}`,
			);

			setSearchParams(updateSearch);
		} else {
			// 'created_at' field does not exist, add a new data object
			setSearchParams(prevState => [
				...prevState,
				{
					field: 'created_at',
					value: `${startDate}&${endDate}`,
				},
			]);
		}
	};

	const handleChangeSearch = (valueSearch: ObjectSelect, field: string) => {
		if (valueSearch === null) {
			const removeSearch = deleteFieldParams(field);
			setSearchParams(removeSearch);
			return;
		}

		const fieldIndex = checkAvailableField(field);

		if (fieldIndex !== -1) {
			if (valueSearch?.value || valueSearch === null) {
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

	const onClear = () => {
		refSelectOutlet.current.clearValue();
	};

	return (
		<div className="mb-2 grid grid-cols-3 gap-3">
			<div className="mb-6">
				<Select
					onChange={e => {
						setRestaurant_uuid(e);
						onClear();
					}}
					options={RestaurantSelectOptions}
					isLoading={isLoadingRestaurant}
					labelText="Restaurant:"
					placeholder="ex: Select Restaurant"
					className="flex items-center justify-center"
				/>
			</div>
			<div className="mb-6">
				<Select
					ref={refSelectOutlet}
					onChange={e => {
						handleChangeSearch(e, 'restaurant_outlet_uuid');
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
				/>
			</div>
		</div>
	);
};

export default FilterTableReport;
