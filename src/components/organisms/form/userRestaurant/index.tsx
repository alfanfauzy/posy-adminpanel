/**
 * User Restaurant Form Modal
 */
import IconEye from '@/atoms/icon/IconEye';
import {Outlet} from '@/domain/outlet/models';
import {GetFilterOutletInput} from '@/domain/outlet/repositories/OutletRepositories';
import {Restaurant} from '@/domain/restaurant/models';
import {GetFilterRestaurantInput} from '@/domain/restaurant/repositories/RestaurantRepository';
import {Role} from '@/domain/role/models';
import {GetRolesInput} from '@/domain/role/repositories/RoleRepository';
import {
	FormUserRestaurant,
	UserRestaurant,
} from '@/domain/user-restaurant/models';
import {UpdateUserRestaurantParams} from '@/domain/user-restaurant/repositories/UserRestaurantRepository';
import {queryClient} from '@/hooks/react-query';
import {useForm} from '@/hooks/useForm';
import useToggle from '@/hooks/useToggle';
import {UserRestauranFormSchema} from '@/schemas/userRestaurant';
import {useGetOutletViewModal} from '@/view/outlet/view-models/GetOutletViewModel';
import {useGetRestaurantViewModal} from '@/view/restaurant/view-models/GetRestaurantViewModel';
import {useGetRolesViewModal} from '@/view/role/view-modals/GetRolesViewModel';
import {useCreateUserRestaurantViewModal} from '@/view/user-restaurant/view-modals/CreateUserRestaurantViewModel';
import {useUpdateUserRestaurantViewModal} from '@/view/user-restaurant/view-modals/UpdateUserRestaurantViewModel';
import dynamic from 'next/dynamic';
import {Button, Input, Select} from 'posy-fnb-core';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {AiOutlineCheckSquare} from 'react-icons/ai';
import {toast} from 'react-toastify';

import {ObjectSelect} from '../outlet/entities';
import {FormUserRestaurantEntities} from './entities';

const ModalForm = dynamic(() => import('@/molecules/modal/form'), {
	ssr: false,
});

type MoleculesFormUserRestaurantProps = {
	isEdit: boolean;
	isOpenModal: boolean;
	handleClose: () => void;
	selectedData: UserRestaurant | Record<string, never>;
};

const MoleculesFormUserRestaurant = ({
	isEdit,
	isOpenModal,
	handleClose,
	selectedData,
}: MoleculesFormUserRestaurantProps) => {
	const refSelectOutlet: React.MutableRefObject<any> = useRef();

	const [restaurant_uuid, setRestaurant_uuid] = useState<
		ObjectSelect | Record<string, never>
	>({});

	const hooksRoleParams: GetRolesInput = {
		search: [{field: 'is_internal', value: 'false'}],
		sort: {field: 'created_at', value: 'desc'},
		page: 1,
		limit: 0,
	};

	const hooksRoleRestaurant: GetFilterRestaurantInput = {
		search: [],
		sort: {field: 'created_at', value: 'desc'},
		page: 1,
		limit: 0,
	};

	const hooksOutletRestaurant: GetFilterOutletInput = useMemo(() => {
		const getId = restaurant_uuid?.value?.toString() || '0';
		return {
			search: [{field: 'restaurant_uuid', value: getId}],
			sort: {field: 'created_at', value: 'desc'},
			page: 1,
			limit: 0,
		};
	}, [restaurant_uuid]);

	const {data: ListDataRole, isLoading: isLoadingRole} =
		useGetRolesViewModal(hooksRoleParams);

	const {data: ListDataRestaurant, isLoading: isLoadingRestaurant} =
		useGetRestaurantViewModal(hooksRoleRestaurant);

	const {data: ListDataOutlet, isLoading: isLoadingOutlet} =
		useGetOutletViewModal(hooksOutletRestaurant);

	const RoleSelect = useMemo(() => {
		if (!ListDataRole) return [];

		return Object.values(ListDataRole).map((role: Role) => ({
			label: role.name,
			value: role.uuid,
		}));
	}, [ListDataRole]);

	const RestaurantSelect = useMemo(() => {
		if (!ListDataRestaurant) return [];

		return Object.values(ListDataRestaurant).map((restaurant: Restaurant) => ({
			label: restaurant.name,
			value: restaurant.uuid,
		}));
	}, [ListDataRestaurant]);

	const OutletSelect = useMemo(() => {
		if (!ListDataOutlet) return [];

		return Object.values(ListDataOutlet).map((outlet: Outlet) => ({
			label: outlet.outlet_name,
			value: outlet.uuid,
		}));
	}, [ListDataOutlet]);

	const {value: showPassword, toggle: handleShowPassword} = useToggle(true);
	const {value: showConfirmPassword, toggle: handleShowConfirmPassword} =
		useToggle(true);

	const {
		handleSubmit,
		register,
		reset,
		setValue,
		formState: {errors},
	} = useForm({
		schema: UserRestauranFormSchema,
		mode: 'onChange',
	});

	const handleCloseModal = () => {
		reset();
		handleClose();
		queryClient.invalidateQueries('restaurant/user/list');
	};

	const {createUserRestaurant, isLoading: isLoadingCreate} =
		useCreateUserRestaurantViewModal({
			onSuccess() {
				handleCloseModal();
				toast.success('Sucessfully added new user restaurant');
			},
		});

	const {updateUserRestaurant, isLoading: isLoadingUpdate} =
		useUpdateUserRestaurantViewModal({
			onSuccess() {
				handleCloseModal();
				toast.success('Sucessfully update new user restaurant');
			},
		});

	const handleSubmitForm = (data: FormUserRestaurantEntities) => {
		const newPayload: FormUserRestaurant = {
			email: data.email,
			fullname: data.fullname,
			password: data.password,
			role_uuid: data.role_uuid.value,
			outlet_uuid: data.outlet_uuid.value,
			phone: data.phone,
		};

		const newEditPayload: UpdateUserRestaurantParams = {
			id: selectedData.uuid,
			payload: {
				email: data.email,
				fullname: data.fullname,
				password: data.password,
				phone: data.phone,
			},
		};

		if (isEdit) {
			updateUserRestaurant(newEditPayload);
		} else {
			createUserRestaurant(newPayload);
		}
	};

	useEffect(() => {
		setValue('role_uuid', {
			label: 'role_eksternal',
			value: 'ae1b523a-4e11-4dbe-9b23-d533fcaeed6b',
		});

		if (isEdit) {
			const {name, email, phone, outlet} = selectedData;

			setValue('fullname', name);
			setValue('email', email);
			setValue('phone', phone);

			if (outlet[0]?.outlet_name && outlet[0]?.outlet_uuid) {
				setValue('outlet_uuid', {
					label: outlet[0].outlet_name,
					value: outlet[0].outlet_uuid,
				});
			}

			if (outlet[0]?.restaurant_name && outlet[0]?.restaurant_uuid) {
				setValue('restaurant_uuid', {
					label: outlet[0].restaurant_name,
					value: outlet[0].restaurant_uuid,
				});
			}
		}
	}, [selectedData, isEdit, setValue]);

	const titleText = isEdit ? 'Edit User' : 'Add New User';

	return (
		<ModalForm
			isOpenModal={isOpenModal}
			handleCloseModal={handleCloseModal}
			title={titleText}
		>
			<section className="w-big-500 p-4">
				<form onSubmit={handleSubmit(data => handleSubmitForm(data))}>
					<div className="mb-6">
						<Input
							{...register('fullname')}
							className="w-52"
							labelText="Fullname:"
							type="text"
							placeholder="ex: John Doe"
							error={!!errors?.fullname}
							helperText={errors?.fullname?.message}
						/>
					</div>

					<div className="mb-6">
						<Input
							{...register('email')}
							className="w-52"
							labelText="Email:"
							type="text"
							placeholder="ex: mail@restaurant.co.id"
							error={!!errors?.email}
							helperText={errors?.email?.message}
						/>
					</div>

					<div className="mb-6">
						<Input
							{...register('phone')}
							className="w-52"
							labelText="Phone Number:"
							type="text"
							placeholder="ex: 08123456789"
							error={!!errors?.phone}
							helperText={errors?.phone?.message}
						/>
					</div>

					{!isEdit && (
						<div>
							<div className="mb-6">
								<Select
									name="role_uuid"
									onChange={e => {
										setValue('role_uuid', e);
									}}
									isLoading={isLoadingRole}
									options={RoleSelect}
									labelText="Role"
									placeholder="ex: Select Role"
									className="flex items-center justify-center"
									error={!!errors.role_uuid}
									helperText={errors?.role_uuid?.message}
								/>
							</div>

							<div className="mb-6">
								<Select
									name="restaurant_uuid"
									onChange={e => {
										setValue('restaurant_uuid', e);
										setRestaurant_uuid(e);
										refSelectOutlet.current.clearValue();
									}}
									options={RestaurantSelect}
									isLoading={isLoadingRestaurant}
									labelText="Restaurant:"
									placeholder="ex: Select Restaurant"
									className="flex items-center justify-center"
									error={!!errors.restaurant_uuid}
									helperText={errors?.restaurant_uuid?.message}
								/>
							</div>

							<div className="mb-6">
								<Select
									ref={refSelectOutlet}
									name="outlet_uuid"
									onChange={e => setValue('outlet_uuid', e)}
									isLoading={isLoadingOutlet}
									options={OutletSelect}
									labelText="Outlet:"
									placeholder="ex: Select Outlet"
									className="flex items-center justify-center"
									error={!!errors.outlet_uuid}
									helperText={errors?.outlet_uuid?.message}
								/>
							</div>
						</div>
					)}
					<div className="mb-6">
						<Input
							{...register('password')}
							className="w-52"
							labelText="Password:"
							placeholder="Password"
							error={!!errors?.password}
							helperText={errors?.password?.message}
							type={showPassword ? 'password' : 'text'}
							endAdornment={
								<IconEye
									value={showPassword}
									handlePassword={handleShowPassword}
								/>
							}
						/>
					</div>

					<div className="mb-6">
						<Input
							{...register('confirmPassword')}
							className="w-52"
							labelText="Confirm Password:"
							placeholder="Confirm Password"
							error={!!errors?.confirmPassword}
							helperText={errors?.confirmPassword?.message}
							type={showConfirmPassword ? 'password' : 'text'}
							endAdornment={
								<IconEye
									value={showConfirmPassword}
									handlePassword={handleShowConfirmPassword}
								/>
							}
						/>
					</div>

					<Button
						type="submit"
						variant="primary"
						size="l"
						fullWidth
						isLoading={isLoadingCreate || isLoadingUpdate}
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

export default MoleculesFormUserRestaurant;
