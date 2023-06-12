import AtomSwitch from '@/atoms/switch';
import {PaymentMethodBased} from '@/domain/payment/models';
import {queryClient} from '@/hooks/react-query';
import useToggle from '@/hooks/useToggle';
import {useUpdatePaymentMethodCategoryByRestaurantViewModal} from '@/view/payment/view-models/UpdatePaymentMethodCategoryByRestaurantViewModel';
import {useRouter} from 'next/router';
import React from 'react';
import {toast} from 'react-toastify';

type MoleculesSwitchProps = {
	data: boolean;
	item: PaymentMethodBased;
};

const MoleculesSwitchStatusPaymentMethod = ({
	data,
	item,
}: MoleculesSwitchProps) => {
	const {query} = useRouter();
	const {restaurantID} = query;

	const {value: statusValue, toggle} = useToggle(data);

	const {updatePaymentMethodCategory} =
		useUpdatePaymentMethodCategoryByRestaurantViewModal({
			onSuccess() {
				toggle();
				toast.success('Sucessfully update payment method');
				queryClient.invalidateQueries('payment-method/list');
			},
		});

	const handleCheckedChange = async (checked: boolean) => {
		const payload = {
			restaurant_uuid: restaurantID,
			payment_method_category: [
				{
					uuid: item.payment_method_category_uuid,
					is_show: true,
					payment_method: [
						{
							uuid: item.uuid,
							is_show: checked,
						},
					],
				},
			],
		};

		updatePaymentMethodCategory(payload);
	};

	return (
		<AtomSwitch
			value={statusValue}
			name="is_show"
			onChange={handleCheckedChange}
		/>
	);
};

export default MoleculesSwitchStatusPaymentMethod;
