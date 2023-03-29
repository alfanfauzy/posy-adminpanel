import AtomSwitch from '@/atoms/switch';
import {Category, FormCategory} from '@/domain/category/models';
import useToggle from '@/hooks/useToggle';
import {useUpdateCategoryViewModal} from '@/view/category/view-modals/UpdateCategoryViewModel';
import React from 'react';
import {toast} from 'react-toastify';

type MoleculesSwitchProps = {
	data: boolean;
	item: Category;
	handleRefetch: () => void;
};

const MoleculesSwitchStatusCategory = ({
	data,
	item,
	handleRefetch,
}: MoleculesSwitchProps) => {
	const {value: statusValue} = useToggle(data);

	const {updateCategory} = useUpdateCategoryViewModal({
		onSuccess() {
			toast.success('Sucessfully update category');
			handleRefetch();
		},
	});

	const handleCheckedChange = async (checked: boolean) => {
		const newCategory: FormCategory = {
			category_name: item.name,
			restaurant_uuid: item.restaurant_uuid,
			is_active: checked,
		};

		updateCategory({id: item.uuid, payload: newCategory});
	};

	return (
		<AtomSwitch
			value={statusValue}
			name="is_active"
			text={statusValue ? 'Active' : 'Inactive'}
			onChange={handleCheckedChange}
			// onChange={handleIsActiveCategory}
		/>
	);
};

export default MoleculesSwitchStatusCategory;
