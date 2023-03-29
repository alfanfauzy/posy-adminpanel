/**
 * Permission Form Modal
 */
import {Access} from '@/domain/access/models';
import {useForm} from '@/hooks/useForm';
import {PermissionFormSchema} from '@/schemas/permission';
import {useCreateAccessViewModal} from '@/view/access/view-modals/CreateAccessViewModel';
import {useUpdateAccessViewModal} from '@/view/access/view-modals/UpdateAccessViewModel';
import dynamic from 'next/dynamic';
import {Button, Input} from 'posy-fnb-core';
import React, {useEffect} from 'react';
import {AiOutlineCheckSquare} from 'react-icons/ai';
import {toast} from 'react-toastify';

import {FormPermissionEntities} from './entities';

const ModalForm = dynamic(() => import('@/molecules/modal/form'), {
	ssr: false,
});

type MoleculesFormPermissionProps = {
	isEdit: boolean;
	isOpenModal: boolean;
	handleClose: () => void;
	selectedData: Access;
	handleRefetch: () => void;
	type: 'admin' | 'client';
};

const MoleculesFormPermission = ({
	isEdit,
	isOpenModal,
	handleClose,
	selectedData,
	handleRefetch,
	type,
}: MoleculesFormPermissionProps) => {
	const {
		handleSubmit,
		register,
		reset,
		setValue,
		formState: {errors},
	} = useForm({
		schema: PermissionFormSchema,
		mode: 'onChange',
	});

	const handleCloseModal = () => {
		reset();
		handleClose();
		handleRefetch();
	};

	const {createAccess, isLoading: isLoadingCreate} = useCreateAccessViewModal({
		onSuccess() {
			handleCloseModal();
			toast.success('Sucessfully added new Permission');
		},
	});

	const {updateAccess, isLoading: isLoadingUpdate} = useUpdateAccessViewModal({
		onSuccess() {
			handleCloseModal();
			toast.success('Sucessfully update Permission');
		},
	});

	const handleSubmitForm = (data: FormPermissionEntities) => {
		const {uuid} = selectedData;

		const is_internal = type === 'admin';

		const newPayload = {...data, is_internal};

		const editPayload = {
			id: uuid,
			payload: newPayload,
		};

		if (isEdit) {
			updateAccess(editPayload);
		} else {
			createAccess(newPayload);
		}
	};

	useEffect(() => {
		if (isEdit) {
			const {name, description, key} = selectedData;
			setValue('name', name);
			setValue('description', description);
			setValue('key', key);
		}
	}, [selectedData, isEdit, setValue]);

	const wordingText = isEdit
		? {title: 'Edit Permission', button: 'Save'}
		: {title: 'Create New Permission', button: 'Submit'};

	return (
		<ModalForm
			isOpenModal={isOpenModal}
			handleCloseModal={handleCloseModal}
			title={wordingText.title}
		>
			<section className="w-big-500 p-4">
				<form onSubmit={handleSubmit(data => handleSubmitForm(data))}>
					<div className="mb-6">
						<Input
							{...register('name')}
							className="w-52"
							labelText="Permission Name:"
							type="text"
							placeholder="ex: Get All User, Create New User"
							error={!!errors?.name}
							helperText={errors?.name?.message}
						/>
					</div>

					<div className="mb-6">
						<Input
							{...register('key')}
							labelText="Permission Key:"
							placeholder="Permission key, ex: report:transaction"
							className="flex items-center justify-center"
							error={!isEdit && !!errors.key}
							helperText={errors?.key?.message}
						/>
					</div>

					<div className="mb-6">
						<Input
							{...register('description')}
							labelText="Permission Description: "
							placeholder="Description of Permission"
							className="flex items-center justify-center"
							error={!isEdit && !!errors.description}
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

export default MoleculesFormPermission;
