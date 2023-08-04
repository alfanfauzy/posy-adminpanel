import AtomSwitch from '@/atoms/switch';
import {
	PaymentMethodBased,
	PaymentMethodCategoryByRestaurantPayload,
} from '@/domain/payment/models';
import {queryClient} from '@/hooks/react-query';
import useToggle from '@/hooks/useToggle';
import {PaymentOptionType} from '@/organisms/form/payment/options';
import {useUpdatePaymentMethodCategoryByRestaurantViewModal} from '@/view/payment/view-models/UpdatePaymentMethodCategoryByRestaurantViewModel';
import {useRouter} from 'next/router';
import React from 'react';
import {toast} from 'react-toastify';

type MoleculesSwitchProps = {
	type: PaymentOptionType;
	data: boolean;
	item: PaymentMethodBased;
};

const MoleculesSwitchStatusPaymentMethod = ({
	type,
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
		const payload: PaymentMethodCategoryByRestaurantPayload = {
			restaurant_uuid: restaurantID as string,
			payment_method_uuid: item.uuid,
			payload: {
				field: type,
				status: checked,
			},
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
