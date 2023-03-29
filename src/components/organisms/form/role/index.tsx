/**
 * Role Form Modal
 */
import {Role} from '@/domain/role/models';
import {useForm} from '@/hooks/useForm';
import {RoleFormSchema} from '@/schemas/role';
import {useCreateRolesViewModal} from '@/view/role/view-modals/CreateRoleViewModel';
import {useUpdateRolesViewModal} from '@/view/role/view-modals/UpdateRoleViewModel';
import dynamic from 'next/dynamic';
import {Button, Input} from 'posy-fnb-core';
import React, {useEffect} from 'react';
import {AiOutlineCheckSquare} from 'react-icons/ai';
import {toast} from 'react-toastify';

import {FormRoleEntities} from './entities';

const ModalForm = dynamic(() => import('@/molecules/modal/form'), {
	ssr: false,
});
type MoleculesFormRoleProps = {
	isEdit: boolean;
	isOpenModal: boolean;
	handleClose: () => void;
	selectedData: Role;
	handleRefetch: () => void;
	type: 'admin' | 'client';
};

const MoleculesFormRole = ({
	isEdit,
	isOpenModal,
	handleClose,
	selectedData,
	handleRefetch,
	type,
}: MoleculesFormRoleProps) => {
	const {
		handleSubmit,
		register,
		reset,
		setValue,
		formState: {errors},
	} = useForm({
		schema: RoleFormSchema,
		mode: 'onChange',
	});

	const handleCloseModal = () => {
		reset();
		handleClose();
		handleRefetch();
	};

	const {createRole, isLoading} = useCreateRolesViewModal({
		onSuccess() {
			handleCloseModal();
			toast.success('Sucessfully added new Role');
		},
	});

	const {updateRole, isLoading: isLoadingUpdate} = useUpdateRolesViewModal({
		onSuccess() {
			handleCloseModal();
			toast.success('Sucessfully updated Role');
		},
	});

	const handleSubmitForm = (data: FormRoleEntities) => {
		const {uuid} = selectedData;

		const is_internal = type === 'admin';

		const newPayload = {...data, is_internal};

		const paramsEdit = {id: uuid, payload: newPayload};

		if (isEdit) {
			updateRole(paramsEdit);
		} else {
			createRole(newPayload);
		}
	};

	useEffect(() => {
		if (isEdit) {
			const {name, description} = selectedData;
			setValue('name', name || '');
			setValue('description', description || '');
		}
	}, [selectedData, isEdit, setValue]);

	const titleText = isEdit ? 'Edit Role' : 'Create New Role';

	return (
		<ModalForm
			handleCloseModal={handleCloseModal}
			isOpenModal={isOpenModal}
			title={titleText}
		>
			<section className="w-big-500">
				<form onSubmit={handleSubmit(data => handleSubmitForm(data))}>
					<div className="mb-6">
						<Input
							{...register('name')}
							className="w-52"
							labelText="Role Name:"
							type="text"
							placeholder="ex: Superadmin, etx"
							error={!!errors?.name}
							helperText={errors?.name?.message}
						/>
					</div>

					<div className="mb-6">
						<Input
							{...register('description')}
							labelText="Role Description"
							placeholder="Description of Role"
							className="flex items-center justify-center"
							error={!isEdit && !!errors.description}
							helperText={errors?.description?.message}
						/>
					</div>
					{/** Hide for some reason from product */}
					{/* <div className="mb-6">
            <AtomSwitch
              onChange={handleIsAdminValue}
              label="Is Internal"
              name="is_internal"
              value={isAdminValue}
            />
          </div> */}

					<Button
						isLoading={isLoading || isLoadingUpdate}
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

export default MoleculesFormRole;
