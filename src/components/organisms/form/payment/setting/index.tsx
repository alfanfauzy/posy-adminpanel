import {Loading} from '@/atoms/loading';
import {mapToPaymentMethodCategoryPayload} from '@/data/payment/mappers/PaymentMethodMapper';
import {PaymentMethodCategoryPayload} from '@/domain/payment/models';
import {GetFilterPaymentMethodCategory} from '@/domain/payment/repositories/PaymentRepositories';
import {queryClient} from '@/hooks/react-query';
import {useForm} from '@/hooks/useForm';
import PaymentSetting from '@/molecules/payment/setting';
import {UpdateStatusPaymentMethodCategoryFormSchema} from '@/schemas/payment/setting';
import {useGetPaymentMethodCategoryViewModal} from '@/view/payment/view-models/GetPaymentMethodCategoryViewModel';
import {useUpdatePaymentMethodCategoryViewModal} from '@/view/payment/view-models/UpdatePaymentMethodCategoryViewModel';
import {Button} from 'posy-fnb-core';
import React, {useMemo} from 'react';
import {FormProvider} from 'react-hook-form';
import {toast} from 'react-toastify';

const PaymentSettingLayout = () => {
	const methodsForm = useForm({
		schema: UpdateStatusPaymentMethodCategoryFormSchema,
	});

	const {reset} = methodsForm;

	const hooksParams: GetFilterPaymentMethodCategory = useMemo(
		() => ({
			search: [
				{
					field: 'with_payment_method',
					value: 'true',
				},
			],
			sort: {field: 'created_at', value: 'desc'},
			page: 1,
			limit: 10,
		}),
		[],
	);

	const {data: ListPaymentMethodCategory, isLoading} =
		useGetPaymentMethodCategoryViewModal(hooksParams, {
			onSuccess(data) {
				reset({
					payment_method_category: data.data.objs.map(
						paymentMethodCategory => ({
							uuid: paymentMethodCategory.uuid,
							is_show: paymentMethodCategory.is_show,
							payment_method: paymentMethodCategory.payment_method.map(
								paymentMethod => ({
									uuid: paymentMethod.uuid,
									is_show: paymentMethod.is_show,
								}),
							),
						}),
					),
				});
			},
		});

	const {
		updatePaymentMethodCategory,
		isLoading: isLoadingUpdatePaymentMethodCategory,
	} = useUpdatePaymentMethodCategoryViewModal({
		onSuccess() {
			toast.success('Sucessfully update payment method');
			queryClient.invalidateQueries('payment-method-category/list');
		},
	});

	const updatePaymentSetting = (data: PaymentMethodCategoryPayload) => {
		const mapPayload = mapToPaymentMethodCategoryPayload(data);
		updatePaymentMethodCategory(mapPayload);
	};

	return (
		<div>
			<FormProvider {...methodsForm}>
				<form onSubmit={methodsForm.handleSubmit(updatePaymentSetting)}>
					<div className="h-screen overflow-auto">
						<p className="mb-3 text-heading-s-regular">Payment Setting</p>
						<div className="mt-4 mb-4 border border-gray-200"></div>
						{isLoading && (
							<section className="mx-[50%]">
								<Loading size={10} />
							</section>
						)}

						{ListPaymentMethodCategory?.map((paymentMethodCategory, idx) => (
							<PaymentSetting
								data={paymentMethodCategory}
								key={paymentMethodCategory.uuid}
								idx={idx}
							/>
						))}
					</div>
					<div className="mt-3 flex justify-end">
						<Button isLoading={isLoadingUpdatePaymentMethodCategory}>
							Submit
						</Button>
					</div>
				</form>
			</FormProvider>
		</div>
	);
};

export default PaymentSettingLayout;
