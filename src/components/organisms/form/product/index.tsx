/* eslint-disable react/jsx-props-no-spreading */
/**
 * Modal Form Product
 */
import HRLine from '@/atoms/horizontalLine';
import {Loading} from '@/atoms/loading';
import AtomSwitch from '@/atoms/switch';
import {formatCurrencyTextInput} from '@/constants/utils';
import {mapToDetailProductModel} from '@/data/product/mappers/ProductMapper';
import {Category} from '@/domain/category/models';
import {GetFilterCategoryInput} from '@/domain/category/repositories/CategoryRepository';
import {Outlet} from '@/domain/outlet/models';
import {GetFilterOutletInput} from '@/domain/outlet/repositories/OutletRepositories';
import {FormProduct, Product} from '@/domain/product/models';
import {UpdateProductParams} from '@/domain/product/repositories/ProductRepository';
import {queryClient} from '@/hooks/react-query';
import {useForm} from '@/hooks/useForm';
import {ProductSchema} from '@/schemas/product';
import {useGetCategoryViewModal} from '@/view/category/view-modals/GetCatalogViewModel';
import {useUploadImagePublicViewModal} from '@/view/file-upload/view-modals/UploadImagePublicViewModels';
import {useGetOutletViewModal} from '@/view/outlet/view-models/GetOutletViewModel';
import {useCreateProductViewModal} from '@/view/product/view-models/CreateProductViewModel';
import {useGetDetailProductViewModal} from '@/view/product/view-models/GetDetailProductViewModel';
import {useUpdateProductViewModal} from '@/view/product/view-models/UpdateProductViewModel';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import {Button, Input, Select, Textarea} from 'posy-fnb-core';
import React, {useEffect, useMemo, useState} from 'react';
import {Controller, FormProvider, useFieldArray} from 'react-hook-form';
import {AiFillDelete, AiOutlineCheckSquare} from 'react-icons/ai';
import {toast} from 'react-toastify';
import {useAppSelector} from 'store/hooks';

import {FormManageProduct} from './entities';
import Variant from './variant';

const ModalForm = dynamic(() => import('@/molecules/modal/form'), {
	ssr: false,
});

type MoleculesFormProductProps = {
	isEdit: boolean;
	isOpenModal: boolean;
	handleClose: () => void;
	selectedData: Product | Record<string, never>;
};

const OrganismFormProduct = ({
	isEdit,
	isOpenModal,
	handleClose,
	selectedData,
}: MoleculesFormProductProps) => {
	const {uuid: restaurant_uuid} = useAppSelector(state => state.restaurant);

	const [imageProduct, setImageProduct] = useState('');

	const methodsForm = useForm({
		schema: ProductSchema,
		defaultValues: {
			restaurant_uuid: restaurant_uuid,
			is_available: false,
			is_favourite: false,
			is_show: false,
		},
	});

	const {
		control,
		formState: {errors},
		setValue,
		watch,
		getValues,
		reset,
	} = methodsForm;

	const {fields, append, remove} = useFieldArray({
		control,
		name: 'addons',
	});

	const hooksParamsCategory: GetFilterCategoryInput = {
		restaurant_uuid,
		search: [{field: 'is_active', value: 'true'}],
		sort: {field: 'created_at', value: 'desc'},
		page: 1,
		limit: 0,
	};

	const hooksParamsOutlet: GetFilterOutletInput = {
		restaurant_uuid,
		search: [],
		sort: {field: 'created_at', value: 'desc'},
		page: 1,
		limit: 0,
	};

	const {data: ListCategory, isLoading: isLoadingCategory} =
		useGetCategoryViewModal(hooksParamsCategory);

	const {data: ListOutlet, isLoading: isLoadingOutlet} =
		useGetOutletViewModal(hooksParamsOutlet);

	const {data: DetailProduct, isLoading: isLoadingProduct} =
		useGetDetailProductViewModal(selectedData.uuid, {
			onSuccess: data => {
				if (data.message === 'OK' && data.data) {
					const mappedData = mapToDetailProductModel(data.data);
					setValue('force_outlet_update', false);
					setImageProduct(mappedData.product_image_url);
					setValue('product_image_url', mappedData.product_image_url);
					setValue('product_name', mappedData.name);
					setValue('cooking_duration', mappedData.cooking_duration.toString());
					setValue('product_description', mappedData.product_description);
					setValue('price', mappedData.price.toString());
					setValue('is_discount', mappedData.is_discount);
					setValue('is_show', mappedData.is_show ?? false);
					setValue('is_available', mappedData.is_available ?? false);
					setValue('is_favourite', mappedData.is_favourite);
					setValue('category_uuids', mappedData.categories);
					setValue('restaurant_outlet_uuids', mappedData.restaurant_outlets);
					setValue(
						'price_after_discount',
						mappedData.price_after_discount.toString(),
					);
					setValue(
						'price_discount_percentage',
						mappedData.price_discount_percentage.toString(),
					);
					if (mappedData?.addons) {
						mappedData?.addons.forEach(addon => {
							append({
								addon_name: addon.addon_name,
								can_choose_multiple: addon.can_choose_multiple,
								is_optional: addon.is_optional,
								max_variant: addon.max_variant.toString(),
								addon_priority: '0',
								variants: addon.variants.map(variant => ({
									variant_name: variant.variant_name,
									variant_price: variant?.variant_price
										? variant?.variant_price.toString()
										: '0',
									variant_priority: variant?.variant_priority ?? 0,
								})),
							});
						});
					}
				}
			},
		});

	const OptionsCategory = useMemo(() => {
		if (!ListCategory) return [];

		return Object.values(ListCategory).map((category: Category) => ({
			label: category.name,
			value: category.uuid,
		}));
	}, [ListCategory]);

	const OptionsOutlet = useMemo(() => {
		if (!ListOutlet) return [];

		return Object.values(ListOutlet).map((outlet: Outlet) => ({
			label: outlet.outlet_name,
			value: outlet.uuid,
		}));
	}, [ListOutlet]);

	const handleCloseModal = () => {
		reset();
		handleClose();
		setImageProduct('');
		queryClient.invalidateQueries('product/list');
	};

	const {createProduct, isLoading: isLoadingCreate} = useCreateProductViewModal(
		{
			onSuccess() {
				handleCloseModal();
				toast.success('Sucessfully added new product');
			},
		},
	);

	const {updateProduct, isLoading: isLoadingUpdate} = useUpdateProductViewModal(
		{
			onSuccess() {
				handleCloseModal();
				toast.success('Sucessfully added new product');
			},
		},
	);

	const onSubmit = (data: FormManageProduct) => {
		delete data.discount;

		const newAddon = data.addons.map(addon => ({
			...addon,
			max_variant: Number(addon.max_variant),
			addon_priority: Number(addon.addon_priority),
			variants: addon.variants.map(variant => ({
				...variant,
				variant_price: Number(variant.variant_price.split('.').join('')),
			})),
		}));

		const newPayload: FormProduct = {
			...data,
			category_uuids: data.category_uuids.map(category => category.value),
			restaurant_outlet_uuids: data.restaurant_outlet_uuids.map(
				outlet => outlet.value,
			),
			cooking_duration: Number(data.cooking_duration),
			price: Number(data.price.split('.').join('')),
			price_after_discount: Number(
				data.price_after_discount.split('.').join(''),
			),
			addons: newAddon,
		};

		if (isEdit) {
			const newUpdatePayload: UpdateProductParams = {
				id: selectedData.uuid,
				payload: newPayload,
			};

			updateProduct(newUpdatePayload);
		} else {
			createProduct(newPayload);
		}
	};

	const {uploadImagePublic} = useUploadImagePublicViewModal({
		onSuccess(data) {
			setValue('product_image_url', data.data.url);
		},
	});

	const onImageChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		prefix: string,
	) => {
		if (event.target.files && event.target.files[0]) {
			const formDataUploadImagePublic = new FormData();

			setImageProduct(URL.createObjectURL(event.target.files[0]));

			formDataUploadImagePublic.append('image_filename_prefix', prefix);
			formDataUploadImagePublic.append('image_file', event.target.files[0]);

			uploadImagePublic(formDataUploadImagePublic);
		}
	};

	useMemo(() => {
		const price = getValues('price') || '0';
		const discount = Number(getValues('discount'));

		const convert = Number(price.split('.').join(''));
		const calculatedPriceDiscount = (convert * discount) / 100;

		const priceAfterDiscount = convert - calculatedPriceDiscount;
		setValue(
			'price_after_discount',
			formatCurrencyTextInput(priceAfterDiscount.toString()),
		);
	}, [getValues('price'), getValues('discount')]);

	const titleText = isEdit ? 'Edit Product Menu' : 'Add New Product Menu';

	return (
		<ModalForm
			isOpenModal={isOpenModal}
			handleCloseModal={handleCloseModal}
			title={titleText}
		>
			<section className="w-[750px] p-4">
				{isEdit && isLoadingProduct ? (
					<Loading size={10} />
				) : (
					<FormProvider {...methodsForm}>
						<form onSubmit={methodsForm.handleSubmit(onSubmit)}>
							<div className="px-6 py-4">
								<aside className="flex gap-6">
									<div>
										<p className="mb-1 block text-m-regular">Product Image</p>
										{imageProduct ? (
											<div className="flex h-56 w-56 items-center justify-center rounded-lg transition-all ease-in-out">
												<Image
													width={224}
													height={224}
													src={imageProduct}
													alt="profile-img"
													className="rounded-lg border border-gray-300 object-contain"
												/>
											</div>
										) : null}
										<button
											className="my-4 flex h-8 w-[224px] justify-center rounded !bg-[#00BA9A] p-1 text-center text-white"
											type="button"
										>
											Change Photo
											<input
												onChange={e => onImageChange(e, 'product_image_url')}
												accept="image/png, image/jpeg,"
												type="file"
												className="absolute h-fit w-[192px] cursor-pointer opacity-0"
											/>
										</button>
									</div>

									<div className="flex-1">
										<div>
											<Input
												{...methodsForm.register('restaurant_uuid')}
												className="hidden"
											/>
											<Input
												{...methodsForm.register('product_name')}
												fullwidth
												labelText="Product Name"
												placeholder="ex: Ayam Goreng"
												error={!!errors?.product_name}
												helperText={errors?.product_name?.message}
											/>
										</div>
										<div className="mt-4 mb-4">
											<Controller
												name="restaurant_outlet_uuids"
												control={control}
												render={({field: {name, value}}) => (
													<Select
														name={name}
														labelText="Outlet"
														isLoading={isLoadingOutlet}
														options={OptionsOutlet}
														placeholder={'Choose Outlet'}
														value={value}
														isMulti
														onChange={e => {
															setValue('restaurant_outlet_uuids', e);
														}}
													/>
												)}
											/>
										</div>
										<div className="mt-6 mb-6">
											<Controller
												name="category_uuids"
												control={control}
												render={({field: {name, value}}) => (
													<Select
														name={name}
														value={value}
														labelText="Category"
														isLoading={isLoadingCategory}
														options={OptionsCategory}
														placeholder={'Choose Category'}
														isMulti
														onChange={e => {
															setValue('category_uuids', e);
														}}
													/>
												)}
											/>
										</div>
										<div className="mb-6">
											<Input
												labelText="Cooking Duration"
												placeholder="ex: 15, 20, 45"
												{...methodsForm.register('cooking_duration', {
													setValueAs: v => v.replace(/\D/, ''),
												})}
												value={watch('cooking_duration')}
												error={!!errors.cooking_duration}
												helperText={errors?.cooking_duration?.message}
											/>
										</div>
									</div>
								</aside>

								<aside className="mb-6">
									<Textarea
										{...methodsForm.register('product_description')}
										labelText="Description"
										error={!!errors.product_description}
										helperText={errors?.product_description?.message}
									/>
								</aside>

								<HRLine text="Price Setup" />
								<aside className="mt-6 flex gap-2">
									<div className="w-1/3">
										<Input
											value={watch('price')}
											labelText="Price"
											placeholder="ex: 100.000"
											error={!!errors.price}
											helperText={errors?.price?.message}
											{...methodsForm.register('price', {
												setValueAs: v =>
													formatCurrencyTextInput(v.replace(/\D/, '')),
											})}
										/>
									</div>
									<div className="w-1/3">
										<Input
											labelText="Discount (%)"
											placeholder="ex: 2%"
											{...methodsForm.register('discount', {
												setValueAs: v => v.replace(/\D/, ''),
											})}
											value={watch('discount')}
										/>
									</div>
									<div className="w-1/3">
										<Input
											labelText="Price after discount"
											placeholder="ex: 20.000"
											disabled
											{...methodsForm.register('price_after_discount')}
											value={watch('price_after_discount')}
											error={!!errors.price_after_discount}
											helperText={errors?.price_after_discount?.message}
										/>
									</div>
								</aside>

								<aside className="mt-6 mb-6">
									<HRLine text="View Setup" />
									<aside className="mt-6 grid grid-cols-3 gap-6">
										<div>
											<p className="mb-4">Is Favourite</p>
											<Controller
												name="is_favourite"
												control={control}
												render={({field: {name, value}}) => (
													<AtomSwitch
														name={name}
														value={value}
														text={value ? 'Yes' : 'No'}
														onChange={e => setValue('is_favourite', e)}
													/>
												)}
											/>
										</div>
										<div>
											<p className="mb-4">Is Available</p>
											<Controller
												name="is_available"
												control={control}
												render={({field: {name, value}}) => (
													<AtomSwitch
														name={name}
														value={value}
														text={value ? 'Yes' : 'No'}
														onChange={e => setValue('is_available', e)}
													/>
												)}
											/>
										</div>
										<div>
											<p className="mb-4">Is Show</p>
											<Controller
												name="is_show"
												control={control}
												render={({field: {name, value}}) => (
													<AtomSwitch
														name={name}
														value={value}
														text={value ? 'Yes' : 'No'}
														onChange={e => setValue('is_show', e)}
													/>
												)}
											/>
										</div>
									</aside>
								</aside>

								<HRLine text="Addon Setup" />
								{fields.map((addon, addonIdx) => (
									<aside key={addon.id} className="mt-6">
										<div className="flex items-center justify-between text-l-semibold">
											Add on details
											<AiFillDelete
												className="cursor-pointer text-neutral-70"
												size={20}
												onClick={() => remove(addonIdx)}
											/>
										</div>
										<div className="mt-6">
											<Input
												labelText="Addon name"
												placeholder="ex: Topping, Level"
												{...methodsForm.register(
													`addons.${addonIdx}.addon_name`,
												)}
												error={
													methodsForm.formState.errors?.addons &&
													!!methodsForm.formState.errors?.addons[addonIdx]
														?.addon_name
												}
												helperText={
													methodsForm.formState.errors?.addons &&
													methodsForm.formState.errors?.addons[addonIdx]
														?.addon_name?.message
												}
											/>
										</div>
										<aside className="mt-6 grid grid-cols-4 gap-6">
											<div>
												<Input
													labelText="Max Variant"
													placeholder="ex: 1, 2, etc"
													{...methodsForm.register(
														`addons.${addonIdx}.max_variant`,
													)}
													error={
														methodsForm.formState.errors?.addons &&
														!!methodsForm.formState.errors?.addons[addonIdx]
															?.max_variant
													}
													helperText={
														methodsForm.formState.errors?.addons &&
														methodsForm.formState.errors?.addons[addonIdx]
															?.max_variant?.message
													}
												/>
											</div>
											<div>
												<Input
													labelText="Addon Priority"
													placeholder="ex: 1, 2, etc"
													{...methodsForm.register(
														`addons.${addonIdx}.addon_priority`,
													)}
													error={
														methodsForm.formState.errors?.addons &&
														!!methodsForm.formState.errors?.addons[addonIdx]
															?.addon_priority
													}
													helperText={
														methodsForm.formState.errors?.addons &&
														methodsForm.formState.errors?.addons[addonIdx]
															?.addon_priority?.message
													}
												/>
											</div>
											<div>
												<p className="mb-1 block text-m-regular">Required</p>
												<Controller
													name={`addons.${addonIdx}.is_optional`}
													control={control}
													render={({field: {name, value}}) => (
														<AtomSwitch
															name={name}
															value={value}
															text={value ? 'Yes' : 'No'}
															onChange={e =>
																setValue(`addons.${addonIdx}.is_optional`, e)
															}
														/>
													)}
												/>
											</div>
											<div>
												<p className="mb-1 block text-m-regular">
													Choose multiple
												</p>
												<Controller
													name={`addons.${addonIdx}.can_choose_multiple`}
													control={control}
													render={({field: {name, value}}) => (
														<AtomSwitch
															name={name}
															value={value}
															text={value ? 'Yes' : 'No'}
															onChange={e =>
																setValue(
																	`addons.${addonIdx}.can_choose_multiple`,
																	e,
																)
															}
														/>
													)}
												/>
											</div>
										</aside>

										<Variant addonIdx={addonIdx} />
									</aside>
								))}

								<aside className="mt-6 flex items-center justify-center ">
									<p
										role="presentation"
										onClick={() =>
											append({
												addon_name: '',
												addon_priority: '',
												can_choose_multiple: false,
												is_optional: false,
												max_variant: '',
												variants: [
													{
														variant_name: '',
														variant_price: '',
														variant_priority: 0,
													},
												],
											})
										}
										className="cursor-pointer border p-2 text-l-semibold text-secondary-main hover:opacity-70"
									>
										+ Add addon
									</p>
								</aside>
							</div>

							<HRLine />

							<div className="flex flex-col gap-1">
								{isEdit && (
									<label className="mb-2 flex items-center gap-2 text-xl-regular">
										<Controller
											name={`force_outlet_update`}
											control={control}
											render={({field: {onChange}}) => (
												<input type="checkbox" onChange={onChange} />
											)}
										/>
										Update to all outlet assigned
									</label>
								)}
								<Button
									isLoading={isLoadingCreate || isLoadingUpdate}
									type="submit"
									variant="primary"
									size="l"
									fullWidth
									className="flex  items-center justify-center gap-2"
								>
									<AiOutlineCheckSquare />
									Submit
								</Button>
							</div>
						</form>
					</FormProvider>
				)}
			</section>
		</ModalForm>
	);
};

export default OrganismFormProduct;
