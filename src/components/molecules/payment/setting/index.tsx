import AtomSwitch from '@/atoms/switch';
import {PaymentMethodCategory} from '@/domain/payment/models';
import {Image} from 'antd';
import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';

type PaymentSettingProps = {
	data: PaymentMethodCategory;
	idx: number;
};

const PaymentSetting = ({data, idx}: PaymentSettingProps) => {
	const {control, setValue, getValues, watch} = useFormContext();

	return (
		<div>
			<div className="mb-5 flex flex-col rounded-lg border border-gray-200 bg-white">
				<div className="col flex h-auto w-full flex-row items-center justify-between rounded-sm bg-gray-300 p-2 text-black">
					<div className="flex flex-row items-center gap-5">
						<Image
							width={50}
							src={data.logo_url}
							alt={data.name}
							preview={false}
						/>
						<p>{data.name}</p>
					</div>
					<div>
						<Controller
							name="is_show"
							control={control}
							render={({field: {name}}) => (
								<AtomSwitch
									name={name}
									value={getValues(`payment_method_category.${idx}.is_show`)}
									text={
										getValues(`payment_method_category.${idx}.is_show`)
											? 'Enabled'
											: 'Disabled'
									}
									onChange={e => {
										watch();
										setValue(`payment_method_category.${idx}.is_show`, e);
									}}
								/>
							)}
						/>
					</div>
				</div>
				<div className="flex h-auto justify-start gap-3 px-3 py-3">
					{data.payment_method?.map((paymentMethod, paymentMethodIdx) => (
						<div
							className="relative h-[220px] w-[150px] rounded-md border border-gray-200"
							key={paymentMethod.uuid}
						>
							<div
								className={`h-auto w-full px-3 py-3 ${
									getValues(`payment_method_category.${idx}.is_show`) &&
									getValues(
										`payment_method_category.${idx}.payment_method.${paymentMethodIdx}.is_show`,
									)
										? 'bg-primary text-white'
										: 'bg-slate-200 text-black'
								}`}
							>
								<p>{paymentMethod.name}</p>
							</div>
							<div className="flex items-center justify-center p-4">
								<Image
									width={100}
									src={paymentMethod.logo_url}
									alt={paymentMethod.name}
									preview={false}
								/>
							</div>
							<div className="absolute bottom-0 flex w-full justify-center border-t-2 p-2">
								<Controller
									name="is_show"
									control={control}
									render={({field: {name}}) => (
										<AtomSwitch
											name={name}
											disabled={
												getValues(`payment_method_category.${idx}.is_show`) ===
												false
											}
											value={
												!getValues(`payment_method_category.${idx}.is_show`)
													? false
													: getValues(
															`payment_method_category.${idx}.payment_method.${paymentMethodIdx}.is_show`,
													  )
											}
											text={
												getValues(
													`payment_method_category.${idx}.payment_method.${paymentMethodIdx}.is_show`,
												)
													? 'Enabeld'
													: 'Disabeld'
											}
											onChange={e => {
												watch();
												setValue(
													`payment_method_category.${idx}.payment_method.${paymentMethodIdx}.is_show`,
													e,
												);
											}}
										/>
									)}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default PaymentSetting;
