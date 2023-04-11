/**
 * User Manage Outlet Form Modal
 */
import HRLine from '@/atoms/horizontalLine';
import {FormOutlet, Outlet} from '@/domain/outlet/models';
import {City, District, Province, SubDistrict} from '@/domain/region/models';
import {
	GetFilterCityInput,
	GetFilterDistrictInput,
	GetFilterProvinceInput,
	GetFilterSubDistrictInput,
} from '@/domain/region/repository/RegionRepositories';
import {Restaurant} from '@/domain/restaurant/models';
import {GetFilterRestaurantInput} from '@/domain/restaurant/repositories/RestaurantRepository';
import {Search} from '@/domain/vo/BaseInput';
import {queryClient} from '@/hooks/react-query';
import {useForm} from '@/hooks/useForm';
import {ManageOutletFormSchema} from '@/schemas/outlet';
import {useCreateOutletViewModal} from '@/view/outlet/view-models/CreateOutletViewModel';
import {useUpdateOutletViewModal} from '@/view/outlet/view-models/UpdateOutletViewModel';
import {useGetCityViewModal} from '@/view/region/view-models/GetCityViewModel';
import {useGetDistrictViewModal} from '@/view/region/view-models/GetDistrictViewModel';
import {useGetProvinceViewModal} from '@/view/region/view-models/GetProvinceViewModel';
import {useGetSubDistrictViewModal} from '@/view/region/view-models/GetSubDistrictViewModel';
import {useGetRestaurantViewModal} from '@/view/restaurant/view-models/GetRestaurantViewModel';
import dynamic from 'next/dynamic';
import {Button, Input, Select} from 'posy-fnb-core';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {AiOutlineCheckSquare} from 'react-icons/ai';
import {toast} from 'react-toastify';

import {FormManageOutletEntities, ObjectSelect} from './entities';

const ModalForm = dynamic(() => import('@/molecules/modal/form'), {
	ssr: false,
});

type MoleculesFormManageOutletProps = {
	isEdit: boolean;
	isOpenModal: boolean;
	handleClose: () => void;
	selectedData: Outlet | Record<string, never>;
};

const MoleculesFormManageOutlet = ({
	isEdit,
	isOpenModal,
	handleClose,
	selectedData,
}: MoleculesFormManageOutletProps) => {
	const refSelectCity: React.MutableRefObject<any> = useRef();
	const refSelectDistrict: React.MutableRefObject<any> = useRef();
	const refSelectSubDistrict: React.MutableRefObject<any> = useRef();

	const {
		handleSubmit,
		register,
		reset,
		setValue,
		formState: {errors},
		watch,
		getValues,
		clearErrors,
	} = useForm({
		schema: ManageOutletFormSchema,
		mode: 'onChange',
	});

	const [searchParams, setSearchParams] = useState<Array<Search<any>>>([]);
	const [province_id, setProvince_id] = useState<
		ObjectSelect | Record<string, never>
	>({});
	const [stateCity_id, setCity_id] = useState<
		ObjectSelect | Record<string, never>
	>({});
	const [stateDistrict_id, setDistrict_id] = useState<
		ObjectSelect | Record<string, never>
	>({});
	const [_, setSubDistrict] = useState<ObjectSelect | Record<string, never>>(
		{},
	);

	const hooksParamsRestaurant: GetFilterRestaurantInput = useMemo(
		() => ({
			search: searchParams,
			sort: {field: 'created_at', value: 'desc'},
			page: 1,
			limit: 0,
		}),
		[searchParams],
	);

	const hooksParamsProvince: GetFilterProvinceInput = {
		search: [],
		sort: {field: 'created_at', value: 'desc'},
		page: 1,
		limit: 0,
	};

	const hooksParamsCity: GetFilterCityInput = useMemo(() => {
		const getId = province_id?.value?.toString() || '0';
		return {
			search: [{field: 'province_id', value: getId}],
			sort: {field: 'created_at', value: 'desc'},
			page: 1,
			limit: 0,
		};
	}, [province_id]);

	const hooksParamsDistrict: GetFilterDistrictInput = useMemo(() => {
		const getId = stateCity_id?.value?.toString() || '0';
		return {
			search: [{field: 'city_id', value: getId}],
			sort: {field: 'created_at', value: 'desc'},
			page: 1,
			limit: 0,
		};
	}, [stateCity_id]);

	const hooksParamsSubDistrict: GetFilterSubDistrictInput = useMemo(() => {
		const getId = stateDistrict_id?.value?.toString() || '0';
		return {
			search: [{field: 'district_id', value: getId}],
			sort: {field: 'created_at', value: 'desc'},
			page: 1,
			limit: 0,
		};
	}, [stateDistrict_id]);

	const {data: ListRestaurant, isLoading: isLoadingRestaurant} =
		useGetRestaurantViewModal(hooksParamsRestaurant, {enabled: isOpenModal});

	const {data: ListProvince, isLoading: isLoadingProvince} =
		useGetProvinceViewModal(hooksParamsProvince, {enabled: isOpenModal});

	const {data: ListCity, isLoading: isLoadingCity} = useGetCityViewModal(
		hooksParamsCity,
		{enabled: !!province_id && !!province_id.value},
	);

	const {data: ListDistrict, isLoading: isLoadingDistrict} =
		useGetDistrictViewModal(hooksParamsDistrict, {
			enabled: !!stateCity_id && !!stateCity_id.value,
		});

	const {data: ListSubDistrict, isLoading: isLoadingSubDistrict} =
		useGetSubDistrictViewModal(hooksParamsSubDistrict, {
			enabled: !!stateDistrict_id && !!stateDistrict_id.value,
		});

	const RestaurantSelect = useMemo(() => {
		if (!ListRestaurant) return [];

		return Object.values(ListRestaurant).map((restaurant: Restaurant) => ({
			label: restaurant.name,
			value: restaurant.uuid,
		}));
	}, [ListRestaurant]);

	const ProvinceSelect = useMemo(() => {
		if (!ListProvince) return [];

		return Object.values(ListProvince).map((province: Province) => ({
			label: province.name,
			value: province.id,
		}));
	}, [ListProvince]);

	const CitySelect = useMemo(() => {
		if (!ListCity) return [];

		return Object.values(ListCity).map((city: City) => ({
			label: city.name,
			value: city.id,
		}));
	}, [ListCity]);

	const DistrictSelect = useMemo(() => {
		if (!ListDistrict) return [];

		return Object.values(ListDistrict).map((district: District) => ({
			label: district.name,
			value: district.id,
		}));
	}, [ListDistrict]);

	const SubDistrictSelect = useMemo(() => {
		if (!ListSubDistrict) return [];

		return Object.values(ListSubDistrict).map((subdistrict: SubDistrict) => ({
			label: subdistrict.name,
			value: subdistrict.id,
		}));
	}, [ListSubDistrict]);

	const handleCloseModal = () => {
		reset();
		handleClose();
		queryClient.invalidateQueries('outlet/list');
	};

	const {createOutlet, isLoading: isLoadingCreate} = useCreateOutletViewModal({
		onSuccess() {
			handleCloseModal();
			toast.success('Sucessfully added new outlet');
		},
	});

	const {updateOutlet, isLoading: isLoadingUpload} = useUpdateOutletViewModal({
		onSuccess() {
			handleCloseModal();
			toast.success('Sucessfully update outlet');
		},
	});

	const handleSubmitForm = (data: FormManageOutletEntities) => {
		const newPayload: FormOutlet = {
			restaurant_uuid: data.restaurant_uuid.value,
			outlet_name: data.outlet_name,
			outlet_code: data.outlet_code,
			subdistrict_id: data?.subdistrict_id?.value,
			address: data?.address,
			latitude: data?.latitude,
			longitude: data?.longitude,
			phone: data?.phone,
			email: data?.email,
			qty_table: Number(data.qty_table),
		};

		if (isEdit) {
			const newUpdatePayload = {
				id: selectedData.uuid,
				payload: newPayload,
			};
			updateOutlet(newUpdatePayload);
		} else {
			createOutlet(newPayload);
		}
	};

	useEffect(() => {
		if (isEdit) {
			const {
				restaurant_name,
				restaurant_uuid,
				outlet_name,
				outlet_code,
				address,
				phone,
				latitude,
				longitude,
				email,
				provincy_id,
				provincy_name,
				city_id,
				city_name,
				district_id,
				district_name,
				subdistrict_id,
				subdistrict_name,
				qty_table,
			} = selectedData;

			setValue('restaurant_uuid', {
				label: restaurant_name,
				value: restaurant_uuid,
			});

			if (province_id && provincy_name) {
				setValue('province_id', {
					label: provincy_name,
					value: provincy_id,
				});
			}

			if (city_id && city_name) {
				setValue('city_id', {
					label: city_name,
					value: city_id,
				});
			}

			if (district_id && district_name) {
				setValue('district_id', {
					label: district_name,
					value: district_id,
				});
			}

			if (subdistrict_id && subdistrict_name) {
				setValue('subdistrict_id', {
					label: subdistrict_name,
					value: subdistrict_id,
				});
			}

			setValue('outlet_name', outlet_name);
			setValue('outlet_code', outlet_code);
			setValue('address', address);
			setValue('phone', phone);
			setValue('latitude', latitude);
			setValue('longitude', longitude);
			setValue('email', email);
			setValue('qty_table', qty_table);
		}
	}, [selectedData, isEdit, setValue]);

	const titleText = isEdit ? 'Edit Outlet' : 'Create New Outlet';

	return (
		<ModalForm
			isOpenModal={isOpenModal}
			handleCloseModal={handleCloseModal}
			title={titleText}
		>
			<section className="w-[750px] p-4">
				<form onSubmit={handleSubmit(data => handleSubmitForm(data))}>
					<div className="mb-6">
						{!isEdit && (
							<Select
								name="restaurant_uuid"
								onChange={e => {
									setValue('restaurant_uuid', e);
									clearErrors('restaurant_uuid');
								}}
								options={RestaurantSelect}
								labelText="Restaurant"
								placeholder="ex: Select Restaurant"
								className="flex items-center justify-center"
								error={!!errors.restaurant_uuid}
								helperText={
									errors?.restaurant_uuid && 'This field cannot be empty'
								}
								isLoading={isLoadingRestaurant}
							/>
						)}
					</div>

					<div className="flex w-full gap-2">
						<div className={`mb-6 ${isEdit ? 'w-1/2' : 'w-1/3'}`}>
							<Input
								{...register('outlet_code')}
								labelText="Outlet Code:"
								type="text"
								placeholder="ex: KFC-1"
								error={!!errors?.outlet_code}
								helperText={errors?.outlet_code?.message}
							/>
						</div>

						<div className={`mb-6 ${isEdit ? 'w-1/2' : 'w-1/3'}`}>
							<Input
								{...register('outlet_name')}
								labelText="Outlet Name:"
								type="text"
								placeholder="ex: Outlet Name"
								error={!!errors?.outlet_name}
								helperText={errors?.outlet_code?.message}
							/>
						</div>

						{!isEdit && (
							<div className="mb-6 w-1/3">
								<Input
									{...register('qty_table', {
										setValueAs: v => v.replace(/\D/, ''),
									})}
									disabled={isEdit}
									labelText="Total Table:"
									type="text"
									placeholder="ex: 20"
									error={!!errors?.qty_table}
									helperText={errors?.qty_table && 'This field cannot be empty'}
								/>
							</div>
						)}
					</div>

					<div className="flex justify-between gap-2">
						<div className="mb-6 w-1/2">
							<Input
								{...register('phone', {
									setValueAs: v => v.replace(/\D/, ''),
								})}
								value={watch('phone')}
								className="w-52"
								labelText="Phone:"
								type="text"
								placeholder="ex: 082123456789"
								error={!!errors?.phone}
								helperText={errors?.phone?.message}
							/>
						</div>

						<div className="mb-6 w-1/2">
							<Input
								{...register('email')}
								className="w-52"
								labelText="Email:"
								type="string"
								placeholder="ex: mail@mail.com"
								error={!!errors?.email}
								helperText={errors?.email?.message}
							/>
						</div>
					</div>

					<HRLine text="Outlet Address" />

					<div className="pb-2">
						<Select
							name="province_id"
							onChange={e => {
								setValue('province_id', e);
								setProvince_id(e);
								refSelectCity.current.clearValue();
								clearErrors('province_id');
							}}
							value={watch('province_id')}
							options={ProvinceSelect}
							labelText="Province:"
							placeholder="ex: Select Province"
							className="mb-3 flex items-center justify-center"
							error={!!errors.province_id}
							helperText={errors?.province_id && 'This field cannot be empty'}
							isLoading={isLoadingProvince}
							isClearable
						/>
					</div>

					<div className="pb-2">
						<Select
							ref={refSelectCity}
							name="city_id"
							onChange={e => {
								setValue('city_id', e);
								setCity_id(e);
								refSelectDistrict.current.clearValue();
								clearErrors('city_id');
							}}
							value={watch('city_id')}
							options={CitySelect}
							labelText="City:"
							placeholder="ex: Select City"
							className="flex items-center justify-center"
							error={!!errors.city_id}
							helperText={errors?.city_id && 'This field cannot be empty'}
							isLoading={isLoadingCity}
							disabled={
								getValues('province_id') === undefined ||
								getValues('province_id') === null
							}
						/>
					</div>

					<div className="pb-2">
						<Select
							ref={refSelectDistrict}
							name="district_id"
							onChange={e => {
								setValue('district_id', e);
								setDistrict_id(e);
								refSelectSubDistrict.current.clearValue();
								clearErrors('district_id');
							}}
							value={watch('district_id')}
							options={DistrictSelect}
							labelText="District:"
							placeholder="ex: Select District"
							className="flex items-center justify-center"
							error={!!errors.district_id}
							helperText={errors?.district_id && 'This field cannot be empty'}
							isLoading={isLoadingDistrict}
							disabled={
								getValues('city_id') === undefined ||
								getValues('city_id') === null
							}
						/>
					</div>

					<div className="pb-2">
						<Select
							ref={refSelectSubDistrict}
							name="subdistrict_id"
							onChange={e => {
								setValue('subdistrict_id', e);
								setSubDistrict(e);
								clearErrors('subdistrict_id');
							}}
							value={watch('subdistrict_id')}
							options={SubDistrictSelect}
							labelText="Sub District:"
							placeholder="ex: Select Sub District"
							className="flex items-center justify-center"
							error={!!errors.subdistrict_id}
							helperText={
								errors?.subdistrict_id && 'This field cannot be empty'
							}
							isLoading={isLoadingSubDistrict}
							disabled={
								getValues('district_id') === undefined ||
								getValues('district_id') === null
							}
						/>
					</div>

					<div className="mb-6">
						<Input
							{...register('address')}
							className="w-52"
							labelText="Address:"
							type="text"
							placeholder="ex: Jalan Raya No. 1"
							error={!!errors?.address}
							helperText={errors?.address?.message}
						/>
					</div>
					{!isEdit && (
						<>
							<div className="mb-6">
								<Input
									{...register('longitude')}
									className="w-52"
									labelText="Longitude:"
									type="text"
									placeholder="ex: -6.175969197650049"
									error={!!errors?.longitude}
									helperText={errors?.longitude?.message}
								/>
							</div>

							<div className="mb-6">
								<Input
									{...register('latitude')}
									className="w-52"
									labelText="Latitude:"
									type="text"
									placeholder="ex: 106.81494599676718"
									error={!!errors?.latitude}
									helperText={errors?.latitude?.message}
								/>
							</div>
						</>
					)}
					<Button
						isLoading={isLoadingCreate || isLoadingUpload}
						type="submit"
						variant="primary"
						size="l"
						fullWidth
						className="flex items-center justify-center gap-2"
					>
						<AiOutlineCheckSquare />
						Submit
					</Button>
				</form>
			</section>
		</ModalForm>
	);
};

export default MoleculesFormManageOutlet;
