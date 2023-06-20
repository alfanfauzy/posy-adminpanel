import {Loading} from '@/atoms/loading';
import {mapToPaymentMethodCategoryPayload} from '@/data/payment/mappers/PaymentMethodMapper';
import {PaymentMethodCategoryPayload} from '@/domain/payment/models';
import {GetFilterPaymentMethodCategory} from '@/domain/payment/repositories/PaymentRepositories';
import {queryClient} from '@/hooks/react-query';
import {useForm} from '@/hooks/useForm';
import PaymentSetting from '@/molecules/payment/setting';
import {UpdateStatusPaymentMethodCategoryFormSchema} from '@/schemas/payment/setting-general';
import {useGetPaymentMethodCategoryViewModal} from '@/view/payment/view-models/GetPaymentMethodCategoryViewModel';
import {useUpdatePaymentMethodCategoryViewModal} from '@/view/payment/view-models/UpdatePaymentMethodCategoryViewModel';
import {Button, Tabs} from 'posy-fnb-core';
import React, {useMemo, useState} from 'react';
import {FormProvider} from 'react-hook-form';
import {toast} from 'react-toastify';

const Item = [{label: 'General Payment'}, {label: 'Integrated Payment'}];

const PaymentSettingLayout = () => {
	const [tabsVal, setTabsVal] = useState(0);

	const methodsForm = useForm({
		schema: UpdateStatusPaymentMethodCategoryFormSchema,
	});

	const {reset, getValues, watch} = methodsForm;

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
					payment_method_category: data.data.objs
						.sort((a, b) => a.priority - b.priority)
						.map(paymentMethodCategory => ({
							uuid: paymentMethodCategory.uuid,
							is_show: paymentMethodCategory.is_show,
							payment_method: paymentMethodCategory.payment_method.map(
								paymentMethod => ({
									uuid: paymentMethod.uuid,
									is_show: paymentMethod.is_show,
								}),
							),
						})),
				});
			},
		});

	console.log(watch());

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

	const SortPaymentMethod = ListPaymentMethodCategory?.sort(
		(a, b) => a.priority - b.priority,
	);

	const GeneralPaymentMethodCategory = SortPaymentMethod?.filter(
		paymentMethodCategory => !paymentMethodCategory.is_integration,
	);

	const IntegrationPaymentMethodCategory = SortPaymentMethod?.filter(
		paymentMethodCategory => paymentMethodCategory.is_integration,
	);

	return (
		<div>
			<p className="mb-3 text-heading-s-regular">Payment Setting</p>

			<Tabs items={Item} value={tabsVal} onChange={e => setTabsVal(e)} />

			<FormProvider {...methodsForm}>
				<form onSubmit={methodsForm.handleSubmit(updatePaymentSetting)}>
					<div className="h-screen overflow-auto">
						<div className="mt-4 mb-4 border border-gray-200"></div>
						{isLoading && (
							<section className="mx-[50%]">
								<Loading size={10} />
							</section>
						)}

						{tabsVal === 0 &&
							GeneralPaymentMethodCategory?.map(
								(paymentMethodCategory, idx) => (
									<PaymentSetting
										data={paymentMethodCategory}
										key={paymentMethodCategory.uuid}
										idx={idx}
									/>
								),
							)}

						{tabsVal === 1 &&
							IntegrationPaymentMethodCategory?.map(paymentMethodCategory => (
								<PaymentSetting
									data={paymentMethodCategory}
									key={paymentMethodCategory.uuid}
									idx={4}
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
