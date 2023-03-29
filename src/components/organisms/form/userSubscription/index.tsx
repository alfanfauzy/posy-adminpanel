/**
 * Subscription Form Modal
 */
import AtomDatePicker from '@/atoms/datepicker';
import {Subscription_Period} from '@/constants/index';
import {useForm} from '@/hooks/useForm';
import {DataType} from '@/pages/admin/list/entities';
import {UserSubscriptionFormSchema} from '@/schemas/userSubscription';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import {Button, Select} from 'posy-fnb-core';
import React, {useState} from 'react';
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
	selectedData: DataType;
};

const MoleculesFormUserSubscription = ({
	isEdit = false,
	isOpenModal,
	handleClose,
	selectedData,
}: MoleculesFormUserSubscriptionProps) => {
	const [startDate, setStartDate] = useState(dayjs());

	const {
		handleSubmit,
		register,
		reset,
		setValue,
		formState: {errors},
		watch,
	} = useForm({
		schema: UserSubscriptionFormSchema,
		mode: 'onChange',
	});

	const handleCloseModal = () => {
		reset();
		handleClose();
	};

	const handleCreateAdmin = (data: FormUserSubscriptionEntities) => {
		/**
		 * Todo : Send `data` to backend
		 */

		/**
		 * Will be remove soon
		 */

		const getData = JSON.parse(localStorage.getItem('items') || '');

		getData.push(data);

		localStorage.setItem('items', JSON.stringify(getData));

		/** ---------------------------------------------------- */

		if (getData) {
			handleCloseModal();
			toast.success('Sucessfully added new admin');
		}
	};

	const handleEditAdmin = (data: FormUserSubscriptionEntities) => {
		/**
		 * Todo : Send `data` to backend
		 */
		if (data) {
			handleCloseModal();
			toast.success('Sucessfully edit user admin');
		}
	};

	const handleSubmitForm = (data: FormUserSubscriptionEntities) => {
		if (isEdit) {
			handleEditAdmin(data);
		} else {
			handleCreateAdmin(data);
		}
	};

	const titleText = isEdit ? 'Edit User' : 'Register Subscription';

	return (
		<ModalForm
			handleCloseModal={handleCloseModal}
			isOpenModal={isOpenModal}
			title={titleText}
		>
			<section className="w-big-500 p-4">
				<form onSubmit={handleSubmit(data => handleSubmitForm(data))}>
					<div className="mb-6">
						<Select
							name="restaurantName"
							onChange={e => setValue('restaurantName', e)}
							options={Subscription_Period}
							labelText="Restaurant Name"
							placeholder="ex: Restaurant Name, etc"
							className="flex items-center justify-center"
							error={!!errors.restaurantName}
							helperText={errors?.restaurantName?.message}
						/>
					</div>
					<div className="mb-6">
						<Select
							name="subscriptionPlan"
							onChange={e => setValue('subscriptionPlan', e)}
							options={Subscription_Period}
							labelText="Subscription Plan"
							placeholder="ex: Package, etc"
							className="flex items-center justify-center"
							error={!!errors.subscriptionPlan}
							helperText={errors?.subscriptionPlan?.message}
						/>
					</div>
					<div className="mb-6">
						<AtomDatePicker
							label="Start Date"
							type="single"
							value={startDate}
							onChange={date => Number(setStartDate(date))}
							className="w-full p-2"
							placeholder="Select Start Date"
							format="DD MMMM YYYY"
						/>
					</div>

					<Button
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

export default MoleculesFormUserSubscription;
