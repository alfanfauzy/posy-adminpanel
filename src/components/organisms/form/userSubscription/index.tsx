/**
 * Subscription Form Modal
 */
import {TimetoUnix} from '@/constants/utils';
import {Restaurant} from '@/domain/restaurant/models';
import {GetFilterRestaurantInput} from '@/domain/restaurant/repositories/RestaurantRepository';
import {Subscription} from '@/domain/subscription/models';
import {GetSubscriptionFilterInput} from '@/domain/subscription/repositories/SubscriptionRepository';
import {FormUserSubscriptionRenew} from '@/domain/user-subscription/models';
import {Search} from '@/domain/vo/BaseInput';
import {queryClient} from '@/hooks/react-query';
import {useForm} from '@/hooks/useForm';
import {UserSubscriptionFormSchema} from '@/schemas/userSubscription';
import {useGetRestaurantViewModal} from '@/view/restaurant/view-models/GetRestaurantViewModel';
import {useGetSubscriptionViewModal} from '@/view/subscription/view-modals/GetSubscriptionViewModel';
import {useCreateUserSubscriptionViewModal} from '@/view/user-subscription/view-modals/CreateUserSubscriptionViewModel';
import {format} from 'date-fns';
import dynamic from 'next/dynamic';
import {Button, Input, Select} from 'posy-fnb-core';
import React, {useEffect, useMemo, useState} from 'react';
import {Controller} from 'react-hook-form';
import {AiOutlineCheckSquare} from 'react-icons/ai';
import {toast} from 'react-toastify';

import {FormUserSubscriptionEntities} from './entities';

const ModalForm = dynamic(() => import('@/molecules/modal/form'), {
	ssr: false,
});

type MoleculesFormUserSubscriptionProps = {
	isEdit: boolean;
	isOpenModal: boolean;
	handleClose: () => void;
	restaurant_uuid?: string;
};

const MoleculesFormUserSubscription = ({
	isOpenModal,
	handleClose,
	restaurant_uuid,
}: MoleculesFormUserSubscriptionProps) => {
	const [searchRestaurantParams, setSearchRestaurantParams] = useState<
		Array<Search<any>>
	>([]);

	const {
		handleSubmit,
		control,
		reset,
		setValue,
		formState: {errors},
		clearErrors,
		watch,
	} = useForm({
		schema: UserSubscriptionFormSchema,
		mode: 'onChange',
	});

	const hooksRestaurantParams: GetFilterRestaurantInput = useMemo(
		() => ({
			search: searchRestaurantParams,
			sort: {field: 'created_at', value: 'desc'},
			page: 1,
			limit: 0,
		}),
		[searchRestaurantParams],
	);

	const hooksSubscriptionParams: GetSubscriptionFilterInput = {
		search: [],
		sort: {field: 'created_at', value: 'desc'},
		page: 1,
		limit: 0,
	};

	const {data: ListDataRestaurant, isLoading: isLoadingRestaurant} =
		useGetRestaurantViewModal(hooksRestaurantParams);

	const {data: ListSubscriptions, isLoading: isLoadingSubscription} =
		useGetSubscriptionViewModal(hooksSubscriptionParams);

	const RestaurantSelect = useMemo(() => {
		if (!ListDataRestaurant) return [];

		return Object.values(ListDataRestaurant).map((restaurant: Restaurant) => ({
			label: restaurant.name,
			value: restaurant.uuid,
		}));
	}, [ListDataRestaurant]);

	const SubscriptionsSelect = useMemo(() => {
		if (!ListSubscriptions) return [];

		return Object.values(ListSubscriptions).map(
			(subscription: Subscription) => ({
				label: subscription.name,
				value: subscription.uuid,
			}),
		);
	}, [ListSubscriptions]);

	const handleCloseModal = () => {
		reset();
		handleClose();
		queryClient.invalidateQueries('user-subscription/list');
	};

	const {createUserSubscriptionRenew, isLoading: isLoadingSubscriptionRenew} =
		useCreateUserSubscriptionViewModal({
			onSuccess() {
				handleCloseModal();
				toast.success('Sucessfully renew subscripton');
			},
		});

	const handleSubmitForm = (data: FormUserSubscriptionEntities) => {
		const newPayload: FormUserSubscriptionRenew = {
			restaurant_uuid: data.restaurant_uuid.value,
			subscription_uuid: data.subscription_uuid.value,
			start_date: TimetoUnix(data.start_date),
		};

		createUserSubscriptionRenew(newPayload);
	};

	useEffect(() => {
		if (restaurant_uuid) {
			setSearchRestaurantParams(prevState => [
				...prevState,
				{field: 'uuid', value: restaurant_uuid},
			]);
		}
	}, [restaurant_uuid]);

	useEffect(() => {
		if (restaurant_uuid) {
			setValue('restaurant_uuid', RestaurantSelect[0]);
		}
	}, [RestaurantSelect]);

	const titleText = 'Create New Subscription';
	const today = format(new Date(), 'yyyy-MM-dd');

	return (
		<ModalForm
			handleCloseModal={handleCloseModal}
			isOpenModal={isOpenModal}
			title={titleText}
		>
			<section className="w-big-500 p-4">
				<form onSubmit={handleSubmit(data => handleSubmitForm(data))}>
					<div className="mb-6">
						<Controller
							name="restaurant_uuid"
							control={control}
							render={({field: {name, value}}) => (
								<Select
									name={name}
									value={value}
									onChange={e => {
										setValue('restaurant_uuid', e);
										clearErrors('restaurant_uuid');
									}}
									options={RestaurantSelect}
									isLoading={isLoadingRestaurant}
									disabled={!!restaurant_uuid}
									labelText="Restaurant Name"
									placeholder="ex: Restaurant Name, etc"
									className="flex items-center justify-center"
									error={!!errors.restaurant_uuid}
									helperText={
										errors?.restaurant_uuid && 'This field cannot be empty'
									}
								/>
							)}
						/>
					</div>
					<div className="mb-6">
						<Controller
							name="subscription_uuid"
							control={control}
							render={({field: {name, value}}) => (
								<Select
									name={name}
									value={value}
									onChange={e => {
										setValue('subscription_uuid', e);
										clearErrors('subscription_uuid');
									}}
									options={SubscriptionsSelect}
									isLoading={isLoadingSubscription}
									labelText="Subscription Plan"
									placeholder="ex: Package, etc"
									className="flex items-center justify-center"
									error={!!errors.subscription_uuid}
									helperText={
										errors?.subscription_uuid && 'This field cannot be empty'
									}
								/>
							)}
						/>
					</div>
					<div className="mb-6">
						<Controller
							name="start_date"
							control={control}
							render={({field: {name, value, onChange}}) => (
								<Input
									name={name}
									value={value}
									onChange={onChange}
									className="w-52"
									labelText="Start Date:"
									min={today}
									type="date"
									placeholder="ex: 3 Maret 2023, etc"
									error={!!errors?.start_date}
									helperText={
										errors?.start_date && 'This field cannot be empty'
									}
								/>
							)}
						/>
					</div>

					<Button
						type="submit"
						variant="primary"
						isLoading={isLoadingSubscriptionRenew}
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

export default MoleculesFormUserSubscription;
