/**
 * Subscription Form Modal
 */
import {Subscription_Period} from '@/constants/index';
import {formatCurrencyTextInput} from '@/constants/utils';
import {Subscription} from '@/domain/subscription/models';
import {queryClient} from '@/hooks/react-query';
import {useForm} from '@/hooks/useForm';
import {SubscriptionFormSchema} from '@/schemas/subscription';
import {useCreateSubscriptionViewModal} from '@/view/subscription/view-modals/CreateSubscriptionViewModel';
import {useUpdateSubscriptionViewModal} from '@/view/subscription/view-modals/UpdateSubscriptionViewModel';
import dynamic from 'next/dynamic';
import {Button, Input, Select} from 'posy-fnb-core';
import React, {useEffect} from 'react';
import {AiOutlineCheckSquare} from 'react-icons/ai';
import {toast} from 'react-toastify';

import {FormSubscriptionEntities, OptionObject} from './entities';

const ModalForm = dynamic(() => import('@/molecules/modal/form'), {
	ssr: false,
});

type MoleculesFormSubscriptionProps = {
	isEdit: boolean;
	isOpenModal: boolean;
	handleClose: () => void;
	selectedData: Subscription;
};

const MoleculesFormSubscription = ({
	isEdit = false,
	isOpenModal,
	handleClose,
	selectedData,
}: MoleculesFormSubscriptionProps) => {
	const {
		handleSubmit,
		register,
		reset,
		setValue,
		formState: {errors},
		watch,
		clearErrors,
	} = useForm({
		schema: SubscriptionFormSchema,
		mode: 'onChange',
	});

	const handleCloseModal = () => {
		reset();
		handleClose();
		queryClient.invalidateQueries('subscription/list');
	};

	const {createSubscription, isLoading: isLoadingCreate} =
		useCreateSubscriptionViewModal({
			onSuccess() {
				handleCloseModal();
				toast.success('Successfully added new Subscription Plan');
			},
		});

	const {updateSubscription, isLoading: isLoadingUpdate} =
		useUpdateSubscriptionViewModal({
			onSuccess() {
				handleCloseModal();
				toast.success('Successfully edit Subscription Plan');
			},
		});

	const handleSubmitForm = (data: FormSubscriptionEntities) => {
		const {uuid} = selectedData;
		const {subscription_name, description, period, price} = data;

		const newPayload = {
			subscription_name,
			description,
			price: Number(price.split('.').join('')),
			period: period.value,
		};

		const newUpdatePayload = {
			id: uuid,
			payload: {
				subscription_name,
				description,
				price: Number(price.split('.').join('')),
				period: period.value,
			},
		};

		if (isEdit) {
			updateSubscription(newUpdatePayload);
		} else {
			createSubscription(newPayload);
		}
	};

	const filterOption = (option: OptionObject, inputValue: string) => {
		return option.label.toLowerCase().includes(inputValue.toLowerCase());
	};

	useEffect(() => {
		if (isEdit) {
			const {name, price, period, description} = selectedData;

			setValue('subscription_name', name);
			setValue('price', price.toString());
			setValue('description', description);

			const getPeriod = Object.values(Subscription_Period).filter(
				data => data.value === period,
			);

			setValue('period', getPeriod[0]);
		}
	}, [selectedData, isEdit, setValue]);

	const wordingText = isEdit
		? {title: 'Edit Subscription Plan', button: 'Save'}
		: {title: 'Create New Subscription Plan', button: 'Submit'};

	return (
		<ModalForm
			handleCloseModal={handleCloseModal}
			isOpenModal={isOpenModal}
			title={wordingText.title}
		>
			<section className="w-big-500 p-4">
				<form onSubmit={handleSubmit(data => handleSubmitForm(data))}>
					<div className="mb-6">
						<Input
							{...register('subscription_name')}
							className="w-52"
							labelText="Subscription Name"
							type="text"
							placeholder="ex: Subscription Package Name"
							error={!!errors?.subscription_name}
							helperText={errors?.subscription_name?.message}
						/>
					</div>
					<div className="mb-6">
						<Select
							name="period"
							onChange={e => {
								setValue('period', e);
								clearErrors('period');
							}}
							value={watch('period')}
							options={Subscription_Period}
							labelText="Subscription Period"
							placeholder="ex: 1 Month, etc"
							className="flex items-center justify-center"
							error={!!errors.period}
							filterOption={filterOption}
							helperText={errors?.period && 'This field cannot be empty'}
						/>
					</div>
					<div className="mb-6">
						<Input
							{...register('price', {
								setValueAs: v => formatCurrencyTextInput(v.replace(/\D/, '')),
							})}
							value={watch('price')}
							labelText="Subscription Price"
							placeholder="ex: 1000, input number only"
							className="flex items-center justify-center"
							error={!!errors.price}
							helperText={errors?.price?.message}
						/>
					</div>
					<div className="mb-6">
						<Input
							{...register('description')}
							prefix="Rp"
							labelText="Subscription Description"
							placeholder="ex: Description . . ."
							className="flex items-center justify-center"
							error={!!errors.description}
							helperText={errors?.description?.message}
						/>
					</div>
					<Button
						type="submit"
						variant="primary"
						size="l"
						fullWidth
						className="flex items-center justify-center gap-2"
						isLoading={isLoadingCreate || isLoadingUpdate}
					>
						<AiOutlineCheckSquare />
						{wordingText.button}
					</Button>
				</form>
			</section>
		</ModalForm>
	);
};

export default MoleculesFormSubscription;
