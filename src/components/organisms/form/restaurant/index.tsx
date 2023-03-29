/**
 * Restaurant Form Modal
 */
import HRLine from '@/atoms/horizontalLine';
import {TimetoUnix} from '@/constants/utils';
import {GetAccessListDataResponse} from '@/data/access/types';
import {GetSubscriptionListDataResponse} from '@/data/subscription/types';
import {FormBodyPayload, Restaurant} from '@/domain/restaurant/models';
import {GetSubscriptionFilterInput} from '@/domain/subscription/repositories/SubscriptionRepository';
import {useForm} from '@/hooks/useForm';
import {
	EditRestaurantFormSchema,
	RestaurantFormSchema,
} from '@/schemas/restaurant';
import {useUploadImagePublicViewModal} from '@/view/file-upload/view-modals/UploadImagePublicViewModels';
import {useCreateRestaurantViewModal} from '@/view/restaurant/view-models/CreateRestaurantViewModel';
import {useUpdateRestaurantViewModal} from '@/view/restaurant/view-models/UpdateRestaurantViewModel';
import {useGetSubscriptionViewModal} from '@/view/subscription/view-modals/GetSubscriptionViewModel';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import {Button, Input, Select} from 'posy-fnb-core';
import React, {useEffect, useMemo, useState} from 'react';
import {AiOutlineCheckSquare} from 'react-icons/ai';
import {toast} from 'react-toastify';

import {FormRestaurantEntities} from './entities';

const ModalForm = dynamic(() => import('@/molecules/modal/form'), {
	ssr: false,
});

type MoleculesFormRestaurantProps = {
	isEdit: boolean;
	isOpenModal: boolean;
	handleClose: () => void;
	selectedData: Restaurant | Record<string, never>;
	handleRefetch: () => void;
};

const MoleculesFormRestaurant = ({
	isEdit,
	isOpenModal,
	handleClose,
	selectedData,
	handleRefetch,
}: MoleculesFormRestaurantProps) => {
	const [imageLogo, setImageLogo] = useState('');
	const [imageNPWP, setImageNPWP] = useState('');
	const [imageNIB, setImageNIB] = useState('');
	const FormSchema = isEdit ? EditRestaurantFormSchema : RestaurantFormSchema;

	const {
		handleSubmit,
		register,
		reset,
		setValue,
		formState: {errors},
		watch,
	} = useForm({
		schema: FormSchema,
		mode: 'onChange',
	});

	const hooksParams: GetSubscriptionFilterInput = {
		search: [],
		sort: {field: 'created_at', value: 'desc'},
		page: 0,
		limit: 0,
	};

	const {data: ListSubscription, isLoading: isLoadingSubscription} =
		useGetSubscriptionViewModal(hooksParams);

	const SubscriptionSelect = useMemo(() => {
		if (!ListSubscription) return [];

		return Object.values(ListSubscription).map(
			(role: GetAccessListDataResponse) => ({
				label: role.name,
				value: role.uuid,
			}),
		);
	}, [ListSubscription]);

	const handleCloseModal = () => {
		setImageLogo('');
		setImageNIB('');
		setImageNPWP('');
		reset();
		handleClose();
		handleRefetch();
	};

	const {uploadImagePublic, isLoading: isLoadingUploadImagePublic} =
		useUploadImagePublicViewModal({
			onSuccess(data) {
				const getPrefix = data.data.image_filename.split('_')[0];

				switch (getPrefix) {
					case 'npwp':
						setValue('npwp_url', data.data.url);
						break;
					case 'nib':
						setValue('nib_url', data.data.url);
						break;
					default:
						setValue('restaurant_logo_url', data.data.url);
				}
			},
		});

	const onImageChange = (
		event: any,
		prefix: string,
		type: 'public' | 'private',
	) => {
		if (event.target.files && event.target.files[0]) {
			switch (prefix) {
				case 'npwp_url':
					setImageNPWP(URL.createObjectURL(event.target.files[0]));
					break;
				case 'nib_url':
					setImageNIB(URL.createObjectURL(event.target.files[0]));
					break;
				default:
					setImageLogo(URL.createObjectURL(event.target.files[0]));
					break;
			}

			const formDataUploadImagePublic = new FormData();

			formDataUploadImagePublic.append('image_filename_prefix', prefix);
			formDataUploadImagePublic.append('image_file', event.target.files[0]);

			if (type === 'public') {
				uploadImagePublic(formDataUploadImagePublic);
			}
		}
	};

	const {createRestaurant, isLoading: isLoadingCreate} =
		useCreateRestaurantViewModal({
			onSuccess() {
				handleCloseModal();
				toast.success('Sucessfully added new Restaurant');
			},
		});

	const {updateRestaurant, isLoading: isLoadingUpdate} =
		useUpdateRestaurantViewModal({
			onSuccess() {
				handleCloseModal();
				toast.success('Sucessfully edit Restaurant');
			},
		});

	const handleSubmitForm = (data: FormRestaurantEntities) => {
		const isEmptyFile =
			data.restaurant_logo_url?.length === 0 ||
			data.nib_url?.length === 0 ||
			data.npwp_url?.length === 0;

		if (isEmptyFile) {
			toast.error('Please select a valid file');
			return;
		}

		const newPayload: FormBodyPayload = {
			...data,
			subscription_uuid: data.subscription_uuid.value,
			start_date: TimetoUnix(data.start_date),
		};

		if (isEdit) {
			const newEditPayload = {
				id: selectedData.uuid,
				payload: newPayload,
			};
			updateRestaurant(newEditPayload);
		} else {
			createRestaurant(newPayload);
		}
	};

	useEffect(() => {
		if (isEdit) {
			const {
				name,
				code,
				email,
				phone,
				address,
				description,
				pic_name,
				pic_phone,
				seconds,
				subscription_uuid,
				subscription_name,
				logo,
				npwp,
				nib,
			} = selectedData;

			setImageLogo(logo);
			setImageNPWP(npwp);
			setImageNIB(nib);

			if (ListSubscription) {
				setValue('subscription_uuid', {
					label: subscription_name,
					value: subscription_uuid,
				});

				setValue('restaurant_name', name);
				setValue('restaurant_code', code);
				setValue('restaurant_email', email);
				setValue('restaurant_phone', phone);
				setValue('restaurant_address', address);
				setValue('restaurant_description', description);
				setValue('owner_name', pic_name);
				setValue('owner_phone', pic_phone);
				setValue('start_date', seconds);
				setValue('restaurant_logo_url', logo);
				setValue('nib_url', nib);
				setValue('npwp_url', npwp);
			}
		}
	}, [selectedData, isEdit, setValue]);

	const titleText = isEdit ? 'Edit Restaurant' : 'Create New Restaurant';

	return (
		<ModalForm
			isOpenModal={isOpenModal}
			handleCloseModal={handleCloseModal}
			title={titleText}
		>
			<section className="w-[800px] p-4">
				<form
					onSubmit={handleSubmit(data => handleSubmitForm(data))}
					encType="multipart/form-data"
				>
					<div className="flex gap-2">
						<div className="w-1/3 border-r-2 pr-2">
							<p className="mb-1 block text-m-regular">Restaurant Logo</p>
							{imageLogo ? (
								<div className="flex h-56 w-56 items-center justify-center rounded-lg transition-all ease-in-out">
									<Image
										width={224}
										height={224}
										src={imageLogo}
										alt="profile-img"
										className="rounded-lg border border-gray-300 object-contain"
									/>
								</div>
							) : null}
							<button
								className="my-4 flex h-8 w-[224px] justify-center rounded !bg-[#00BA9A] p-1 text-center text-white"
								type="button"
							>
								Change Photo
								<input
									onChange={e =>
										onImageChange(e, 'restaurant_logo_url', 'public')
									}
									accept="image/png, image/jpeg,"
									type="file"
									className="absolute h-fit w-[192px] cursor-pointer opacity-0"
								/>
							</button>
						</div>
						<div className="w-2/3">
							<div className="mb-6">
								<Input
									{...register('restaurant_code')}
									className="w-full"
									labelText="Restaurant Code:"
									type="text"
									placeholder="ex: KFC, etx"
									error={!!errors?.restaurant_code}
									helperText={errors?.restaurant_code?.message}
								/>
							</div>
							<div className="mb-6">
								<Input
									{...register('restaurant_name')}
									className="w-full"
									labelText="Restaurant Name:"
									type="text"
									placeholder="ex: Superadmin, etx"
									error={!!errors?.restaurant_name}
									helperText={errors?.restaurant_name?.message}
								/>
							</div>
							<div className="mb-6">
								<Input
									{...register('restaurant_email')}
									className="w-52"
									labelText="Restaurant email:"
									type="text"
									placeholder="ex: mail@restaurant.co.id"
									error={!!errors?.restaurant_email}
									helperText={errors?.restaurant_email?.message}
								/>
							</div>
							<div className="mb-6">
								<Input
									{...register('restaurant_phone', {
										setValueAs: v => v.replace(/\D/, ''),
									})}
									value={watch('restaurant_phone')}
									className="w-52"
									labelText="Restaurant phone:"
									type="text"
									placeholder="ex: 082123456789"
									error={!!errors?.restaurant_phone}
									helperText={errors?.restaurant_phone?.message}
								/>
							</div>
							<div className="mb-6">
								<Input
									{...register('restaurant_address')}
									className="w-52"
									labelText="Restaurant address:"
									type="text"
									placeholder="ex: Jl. Raya No. 1"
									error={!!errors?.restaurant_address}
									helperText={errors?.restaurant_address?.message}
								/>
							</div>
							<div className="mb-6">
								<Input
									{...register('restaurant_description')}
									className="w-52"
									labelText="Restaurant description:"
									type="text"
									placeholder="ex: Jl. Raya No. 1"
									error={!!errors?.restaurant_description}
									helperText={errors?.restaurant_description?.message}
								/>
							</div>
						</div>
					</div>

					<div className="mb-3">
						<HRLine text="Restaurant File" />
						<div className="flex gap-2">
							<div className="h-full w-1/2">
								<div className="flex flex-col justify-center gap-2">
									<p className="mb-1 block text-m-regular">NPWP</p>
									{imageNPWP ? (
										<div className="flex h-56 w-56 items-center justify-center rounded-lg transition-all ease-in-out">
											<Image
												width={224}
												height={224}
												src={imageNPWP}
												alt="profile-img"
												className="rounded-lg border border-gray-300 object-contain"
											/>
										</div>
									) : null}
									<button
										className="my-4 flex h-8 w-[224px] justify-center rounded !bg-[#00BA9A] p-1 text-center text-white"
										type="button"
									>
										Change Photo
										<input
											onChange={e => onImageChange(e, 'npwp_url', 'public')}
											accept="image/png, image/jpeg,"
											type="file"
											className="absolute h-fit w-[192px] cursor-pointer opacity-0"
										/>
									</button>
								</div>
							</div>
							<div className="h-full w-1/2">
								<div className="flex flex-col justify-center gap-2">
									<p className="mb-1 block text-m-regular">NIB</p>
									{imageNIB ? (
										<div className="flex h-56 w-56 items-center justify-center rounded-lg transition-all ease-in-out">
											<Image
												width={224}
												height={224}
												src={imageNIB}
												alt="profile-img"
												className="rounded-lg border border-gray-300 object-contain"
											/>
										</div>
									) : null}
									<button
										className="my-4 flex h-8 w-[224px] justify-center rounded !bg-[#00BA9A] p-1 text-center text-white"
										type="button"
									>
										Change Photo
										<input
											onChange={e => onImageChange(e, 'nib_url', 'public')}
											accept="image/png, image/jpeg,"
											type="file"
											className="absolute h-fit w-[192px] cursor-pointer opacity-0"
										/>
									</button>
								</div>
							</div>
						</div>
					</div>

					<div className="mb-3">
						<HRLine text="Restaurant Owner" />
						<div className="mb-6">
							<Input
								{...register('owner_name')}
								className="w-full"
								labelText="Owner Name"
								type="text"
								placeholder="ex: Jonh Doe"
								error={!!errors?.owner_name}
								helperText={errors?.owner_name?.message}
							/>
						</div>
						<div className="mb-6">
							<Input
								{...register('owner_phone', {
									setValueAs: v => v.replace(/\D/, ''),
								})}
								value={watch('owner_phone')}
								className="w-full"
								labelText="Owner Phone"
								type="text"
								placeholder="ex: 08213456789"
								error={!!errors?.owner_phone}
								helperText={errors?.owner_phone?.message}
							/>
						</div>
					</div>
					{!isEdit && (
						<div className="mb-3">
							<HRLine text="Subscription Plan" />
							<div className="flex gap-2">
								<div className="mb-6 w-1/2">
									<Select
										name="subscription_uuid"
										onChange={e => setValue('subscription_uuid', e)}
										options={SubscriptionSelect}
										labelText="Subscription"
										placeholder="Select Subscription Plan"
										className="flex items-center justify-center"
										error={!!errors.subscription_uuid}
										helperText={errors?.subscription_uuid?.message}
										isLoading={isLoadingSubscription}
									/>
								</div>
								<div className="mb-6 w-1/2">
									<Input
										{...register('start_date')}
										className="w-52"
										labelText="Start Date:"
										type="date"
										placeholder="ex: 3 Maret 2023, etc"
										error={!!errors?.start_date}
										helperText={errors?.start_date?.message}
									/>
								</div>
							</div>
						</div>
					)}

					<Button
						isLoading={isLoadingCreate || isLoadingUpdate}
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

export default MoleculesFormRestaurant;
