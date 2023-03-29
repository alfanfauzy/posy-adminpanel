/**
 * Category Form Modal
 */
import AtomSwitch from '@/atoms/switch';
import {Category} from '@/domain/category/models';
import {useForm} from '@/hooks/useForm';
import useToggle from '@/hooks/useToggle';
import {categorySchema} from '@/schemas/category';
import {useCreateCategoryViewModal} from '@/view/category/view-modals/CreateCategoryViewModel';
import dynamic from 'next/dynamic';
import {Button, Input} from 'posy-fnb-core';
import React, {useEffect} from 'react';
import {AiOutlineCheckSquare} from 'react-icons/ai';
import {toast} from 'react-toastify';
import {useAppSelector} from 'store/hooks';

import {FormCategoryEntities} from './entities';

const ModalForm = dynamic(() => import('@/molecules/modal/form'), {
	ssr: false,
});

type MoleculesFormCategoryProps = {
	isEdit: boolean;
	isOpenModal: boolean;
	handleClose: () => void;
	selectedData: Category | Record<string, never>;
	handleRefetch: () => void;
};

const MoleculesFormCategory = ({
	isEdit = false,
	isOpenModal,
	handleClose,
	handleRefetch,
}: MoleculesFormCategoryProps) => {
	const {uuid: restaurant_uuid} = useAppSelector(state => state.restaurant);
	const {value: isActive, toggle: handleIsActiveToggle} = useToggle(false);

	const {
		handleSubmit,
		register,
		reset,
		formState: {errors},
		watch,
		setValue,
	} = useForm({
		schema: categorySchema,
		mode: 'onChange',
	});

	const handleCloseModal = () => {
		reset();
		handleClose();
		handleRefetch();
	};

	const {createCategory, isLoading: isLoadingCreate} =
		useCreateCategoryViewModal({
			onSuccess() {
				handleCloseModal();
				toast.success('Sucessfully added new category');
			},
		});

	const handleSubmitForm = (data: FormCategoryEntities) => {
		const newPayload = {...data, restaurant_uuid};
		createCategory(newPayload);
	};

	useEffect(() => {
		setValue('is_active', isActive);
	}, [isActive]);

	const titleText = 'Create New Category';

	return (
		<ModalForm
			handleCloseModal={handleCloseModal}
			isOpenModal={isOpenModal}
			title={titleText}
		>
			<section className="w-big-500 p-4">
				<form onSubmit={handleSubmit(data => handleSubmitForm(data))}>
					<div className="mb-6">
						<Input
							{...register('category_name')}
							className="w-52"
							labelText="Category Name:"
							type="text"
							placeholder="ex: Drink, Food, Baverages"
							disabled={isEdit}
							error={!!errors?.category_name}
							helperText={errors?.category_name?.message}
						/>
					</div>
					<div className="mb-6">
						<AtomSwitch
							{...register('is_active')}
							name="isDisplay"
							label="Display on Menu"
							text={isActive ? 'Active' : 'Inactive'}
							onChange={handleIsActiveToggle}
						/>
					</div>

					<Button
						isLoading={isLoadingCreate}
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

export default MoleculesFormCategory;
