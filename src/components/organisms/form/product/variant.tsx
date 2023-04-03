/* eslint-disable react/jsx-props-no-spreading */
import HRLine from '@/atoms/horizontalLine';
import {formatCurrencyTextInput} from '@/constants/utils';
import {Button, Input} from 'posy-fnb-core';
import React from 'react';
import {useFieldArray, useFormContext} from 'react-hook-form';
import {AiFillDelete} from 'react-icons/ai';

type VariantTempProps = {
	addonIdx: number;
};

const Variant = ({addonIdx}: VariantTempProps) => {
	const {
		control,
		register,
		formState: {errors},
		watch,
	} = useFormContext();

	const {fields, append, remove} = useFieldArray({
		control,
		name: `addons.${addonIdx}.variants`,
	});

	return (
		<div className="mt-4">
			<HRLine text="Addon Variant" />
			{fields.map((variant, variantIdx) => (
				<aside
					key={variant.id}
					className="mt-6 flex w-full items-center gap-6 align-bottom"
				>
					<div className="w-1/2">
						<Input
							placeholder="ex: Keju, Level 1, etc"
							fullwidth
							labelText="Variant name"
							{...register(
								`addons.${addonIdx}.variants.${variantIdx}.variant_name`,
							)}
							// error={
							// 	!!errors?.addons[addonIdx]?.variants[variantIdx]?.variant_name
							// }
							// helperText={
							// 	errors?.addons &&
							// 	errors?.addons[addonIdx]?.variants[variantIdx]?.variant_name
							// 		?.message
							// }
						/>
					</div>
					<div className="w-1/2">
						<Input
							placeholder="ex: 1.000"
							labelText="Price"
							{...register(
								`addons.${addonIdx}.variants.${variantIdx}.variant_price`,
								{
									setValueAs: v => formatCurrencyTextInput(v.replace(/\D/, '')),
								},
							)}
							value={watch(
								`addons.${addonIdx}.variants.${variantIdx}.variant_price`,
							)}
							// error={
							// 	errors?.addons?.length > 0 &&
							// 	errors?.addons[addonIdx]?.variants?.length > 0 &&
							// 	!!errors?.addons[addonIdx]?.variants[variantIdx]?.variant_price
							// }
							// helperText={
							// 	errors?.addons &&
							// 	errors?.addons[addonIdx]?.variants[variantIdx]?.variant_price
							// 		?.message
							// }
						/>
					</div>
					<div className="pt-5">
						<AiFillDelete
							className="cursor-pointer text-neutral-70"
							size={20}
							onClick={() => remove(addonIdx)}
						/>
					</div>
				</aside>
			))}
			<div className="mt-5 flex justify-end">
				<Button
					variant="secondary"
					type="button"
					size="xs"
					onClick={() =>
						append({
							variant_name: '',
							variant_price: '',
							variant_priority: 0,
						})
					}
				>
					Add variant
				</Button>
			</div>
		</div>
	);
};

export default Variant;
