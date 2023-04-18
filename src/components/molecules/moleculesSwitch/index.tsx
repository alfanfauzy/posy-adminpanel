import AtomSwitch from '@/atoms/switch';
import {Category, FormCategory} from '@/domain/category/models';
import {queryClient} from '@/hooks/react-query';
import useToggle from '@/hooks/useToggle';
import {useUpdateCategoryViewModal} from '@/view/category/view-modals/UpdateCategoryViewModel';
import React from 'react';
import {toast} from 'react-toastify';

type MoleculesSwitchProps = {
	data: boolean;
	item: Category;
	disabled: boolean;
};

const MoleculesSwitchStatusCategory = ({
	data,
	item,
	disabled,
}: MoleculesSwitchProps) => {
	const {value: statusValue, toggle} = useToggle(data);

	const {updateCategory} = useUpdateCategoryViewModal({
		onSuccess() {
			toast.success('Sucessfully update category');
			queryClient.invalidateQueries('category/list');
		},
	});

	const handleCheckedChange = async (checked: boolean) => {
		const newCategory: FormCategory = {
			category_name: item.name,
			restaurant_uuid: item.restaurant_uuid,
			is_active: checked,
		};

		updateCategory({id: item.uuid, payload: newCategory});
		toggle();
	};

	return (
		<AtomSwitch
			disabled={disabled}
			value={statusValue}
			name="is_active"
			text={statusValue ? 'Active' : 'Inactive'}
			onChange={handleCheckedChange}
		/>
	);
};

export default MoleculesSwitchStatusCategory;
