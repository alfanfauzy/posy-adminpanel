import {
	mapToBankOptions,
	mapToPayloadSaveBankAccount,
} from '@/data/bank/mappers/BankMapper';
import {queryClient} from '@/hooks/react-query';
import {useForm} from '@/hooks/useForm';
import {
	PaymentBankAccountForm,
	PaymentBankAccountFormSchema,
} from '@/schemas/payment/setting';
import {useGetBankListViewModal} from '@/view/bank/view-models/GetBankListViewModel';
import {useGetLinkedBankAccountViewModel} from '@/view/bank/view-models/GetLinkedBankAccountViewModel';
import {useCheckBankViewModal} from '@/view/bank/view-models/PostCheckBankViewModel';
import {useSaveAccountBankViewModal} from '@/view/bank/view-models/PostSaveAccountBankViewModel';
import {useGetImagePrivateViewModel} from '@/view/file-upload/view-modals/GetImagePrivateViewModels';
import {useUploadImagePrivateViewModal} from '@/view/file-upload/view-modals/UploadImagePrivateViewModels';
import {useGetPaymentAccountInfoViewModel} from '@/view/payment/view-models/GetPaymentAccountInfoViewModel';
import {Image, Modal} from 'antd';
import {useRouter} from 'next/router';
import {Button, Input, Select} from 'posy-fnb-core';
import React, {useMemo, useRef, useState} from 'react';
import {Controller} from 'react-hook-form';
import {
	AiFillCheckCircle,
	AiOutlineClose,
	AiOutlineUpload,
} from 'react-icons/ai';
import {toast} from 'react-toastify';

type FormPaymentSetting = {
	tabsVal: number;
	isOpenModal: boolean;
	handleOpenModal: () => void;
	isEdit: boolean;
	setIsEdit: (value: boolean) => void;
};

const PAYMENT_ACCOUNT_TYPE = [
	{value: 'MANAGED', label: 'Manage Account'},
	{value: 'OWNED', label: 'Owned Account'},
];

const FormPaymentSetting = ({
	tabsVal,
	isOpenModal,
	handleOpenModal,
	setIsEdit,
	isEdit,
}: FormPaymentSetting) => {
	const {query} = useRouter();
	const {restaurantID} = query;
	const [imageURL, setImageURL] = useState('');
	const [bankProofURL, setBankProofURL] = useState('');
	const [isErrorCheckBank, setIsErrorCheckBank] = useState(false);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const methods = useForm({
		schema: PaymentBankAccountFormSchema,
		mode: 'onChange',
	});

	const {
		handleSubmit,
		reset,
		setValue,
		watch,
		clearErrors,
		formState: {errors},
		control,
	} = methods;

	/**
	 * Service Get Bank List
	 */
	const {data: dataBankList, isLoading: isLoadingBankList} =
		useGetBankListViewModal({
			enabled: !!restaurantID && tabsVal === 5 && isOpenModal,
		});

	const optionsBankList = useMemo(() => {
		if (!dataBankList) return [];

		const mapOptionsBankList = mapToBankOptions(dataBankList);

		return mapOptionsBankList.sort((a, b) => a.label.localeCompare(b.label));
	}, [dataBankList]);

	/**
	 * Service Upload Image
	 */
	const {uploadImagePrivate} = useUploadImagePrivateViewModal({
		onSuccess(data) {
			setValue('bank_proof_url', data.data.url);
			clearErrors('bank_proof_url');
		},
	});

	/**
	 * Service Check Bank
	 */
	const {checkBank, isLoading: isLoadingCheckBank} = useCheckBankViewModal({
		onSuccess(data) {
			const {
				data: {account_name},
			} = data;

			setValue('account_name', account_name);
			clearErrors('account_name');
			setIsErrorCheckBank(false);
		},
		onError() {
			setValue('account_name', '');
			setIsErrorCheckBank(true);
		},
	});

	const {data: linkedBankAccount} = useGetLinkedBankAccountViewModel(
		restaurantID as string,
		{
			enabled: isEdit,
			onSuccess(response) {
				const {
					account_name,
					account_number,
					bank_name,
					bank_proof_url,
					bank_uuid,
					email_notify_withdrawal,
				} = response.data;

				const responseImageURL = bank_proof_url.split('/')[8];

				setValue('bank_uuid', {label: bank_name, value: bank_uuid});
				setValue('account_number', account_number);
				setValue('email', email_notify_withdrawal);
				setValue('account_name', account_name);
				setValue('bank_proof_url', bank_proof_url);
				setImageURL(responseImageURL);
			},
		},
	);

	useGetPaymentAccountInfoViewModel(restaurantID as string, {
		enabled: linkedBankAccount !== undefined,
		onSuccess(response) {
			const {type} = response.data;

			const accountTypeLabel =
				type === 'OWNED' ? 'Owned Account' : 'Manage Account';

			setValue('account_type', {label: accountTypeLabel, value: type});
		},
	});

	useGetImagePrivateViewModel(imageURL, {
		enabled: !!imageURL,
		onSuccess(response) {
			setBankProofURL(response);
		},
	});

	const onClearImage = () => {
		if (fileInputRef.current && fileInputRef.current.value !== null) {
			fileInputRef.current.value = '';
		}
		setValue('bank_proof_url', '');
		setBankProofURL('');
	};

	const handleCloseModal = () => {
		reset({
			account_name: '',
			account_number: '',
			account_type: undefined,
			bank_uuid: undefined,
			email: '',
		});
		onClearImage();
		handleOpenModal();
		setIsEdit(false);
	};

	/**
	 * Service Save Account Bank
	 */

	const {saveBankAccount, isLoading: isLoadingSaveBankAccount} =
		useSaveAccountBankViewModal({
			onSuccess(data) {
				toast.success(data.more_info);
				handleCloseModal();
				queryClient.invalidateQueries('linked-bank-account');
				queryClient.invalidateQueries('payment-account-info');
			},
		});

	const onImageChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		prefix: string,
	) => {
		// Max size 2MB
		const maxSize = 2 * 1024 * 1024;

		if (event.target.files && event.target.files[0]) {
			const fileSize = event.target.files[0].size;

			// Check filesize, don't allow when file more than 2MB
			if (fileSize > maxSize) {
				toast.error(`File size cann't more than 2MB`);
				return;
			}

			setBankProofURL(URL.createObjectURL(event.target.files[0]));

			const formDataUploadImagePrivate = new FormData();

			formDataUploadImagePrivate.append('image_filename_prefix', prefix);
			formDataUploadImagePrivate.append('image_file', event.target.files[0]);

			uploadImagePrivate(formDataUploadImagePrivate);
		}
	};

	const handleCheckBank = () => {
		const {bank_uuid, account_number} = watch();

		const payloadCheckBank = {
			bank_uuid: bank_uuid?.value,
			account_number,
		};

		checkBank(payloadCheckBank);
	};

	const handleSaveAccount = (data: PaymentBankAccountForm) => {
		const payloadData = mapToPayloadSaveBankAccount(
			data,
			restaurantID as string,
		);

		saveBankAccount(payloadData);
	};

	const allowOnlyNumber = (value: string) => {
		return value.replace(/[^0-9]/g, '');
	};

	const isDisabledButtonCheck =
		watch('bank_uuid') === null ||
		watch('bank_uuid') === undefined ||
		watch('account_number') === undefined ||
		watch('account_number') === '';

	return (
		<Modal
			open={isOpenModal}
			onCancel={() => handleCloseModal()}
			title={
				<p className="border-b border-neutral-40 pb-4 text-xl-semibold">
					Payment Setting
				</p>
			}
			footer={null}
		>
			<form onSubmit={handleSubmit(handleSaveAccount)}>
				<section className="flex flex-col gap-4">
					<div>
						<Controller
							name="account_type"
							control={control}
							render={({field: {name, value}}) => (
								<Select
									name={name}
									value={value}
									onChange={e => {
										setValue('account_type', e);
										clearErrors('account_type');
									}}
									options={PAYMENT_ACCOUNT_TYPE}
									labelText="Payment account type"
									placeholder="Select your account type"
									className="flex items-center justify-center"
									error={!!errors.account_type}
									helperText={
										errors?.account_type && 'This field cannot be empty'
									}
									isClearable
									disabled={isEdit}
								/>
							)}
						/>
					</div>

					<div>
						<Controller
							name="bank_uuid"
							control={control}
							render={({field: {name, value}}) => (
								<Select
									name={name}
									value={value}
									onChange={e => {
										setValue('bank_uuid', e);
										clearErrors('bank_uuid');

										// Clear field account name & account number when change bank
										setValue('account_name', '');
										setValue('account_number', '');
									}}
									isLoading={isLoadingBankList}
									options={optionsBankList}
									labelText="Bank name"
									placeholder="Select bank"
									className="flex items-center justify-center"
									error={!!errors.bank_uuid}
									helperText={errors?.bank_uuid && 'This field cannot be empty'}
									isClearable
								/>
							)}
						/>
					</div>

					<div className="flex flex-col">
						<div className="flex flex-row items-end gap-2">
							<Controller
								name="account_number"
								control={control}
								render={({field: {name, onChange, value}}) => (
									<Input
										name={name}
										value={value}
										onChange={e => {
											onChange(allowOnlyNumber(e.target.value));
										}}
										labelText="Bank account number"
										placeholder="Input your bank account"
										className="flex !w-[340px] items-center justify-center"
										error={!!errors.account_number}
										helperText={errors?.account_number?.message}
									/>
								)}
							/>
							<Button
								className="flex flex-row items-center gap-3 !rounded-full !text-l-semibold"
								isLoading={isLoadingCheckBank}
								disabled={isDisabledButtonCheck}
								onClick={() => handleCheckBank()}
							>
								<AiFillCheckCircle size={20} /> Check
							</Button>
						</div>
						{isErrorCheckBank && (
							<p className="mt-1 block text-m-regular text-red-caution">
								Bank account not found, make sure you already input the correct
								bank and account number
							</p>
						)}
					</div>

					<div>
						<Controller
							name="account_name"
							control={control}
							render={({field: {name, value}}) => (
								<Input
									name={name}
									value={value}
									disabled
									labelText="Bank account name"
									placeholder="Input your bank account name"
									className="flex items-center justify-center"
									error={!!errors.account_name}
									helperText={errors?.account_name?.message}
								/>
							)}
						/>
					</div>
					<div>
						<Controller
							name="email"
							control={control}
							render={({field: {name, value, onChange}}) => (
								<Input
									name={name}
									value={value}
									onChange={onChange}
									labelText="Email notification of withdrawal request"
									placeholder="business@mail.com"
									className="flex items-center justify-center"
									error={!!errors.email}
									helperText={errors?.email?.message}
								/>
							)}
						/>
					</div>
					<div>
						<h3 className="mb-2 text-m-bold">Bank account proof</h3>
						<p>
							Upload a photo of your business bank account book or a screenshot
							of bank account details from your banking app
						</p>
						<div className="mt-2">
							{bankProofURL ? (
								<div className="relative w-[140px]">
									<button
										className="absolute right-0 z-10 rounded-full border border-gray-500 p-2 text-red-500"
										onClick={onClearImage}
									>
										<AiOutlineClose />
									</button>
									<Image
										width={100}
										height={100}
										src={bankProofURL}
										alt="bank_proof_url"
										className="rounded-lg border border-gray-300 object-contain"
									/>
								</div>
							) : null}
							<button
								className="my-4 flex items-center justify-center gap-3 p-3 text-center text-m-semibold text-[#654DE4]"
								type="button"
							>
								<AiOutlineUpload />
								<p>Upload documents</p>
								<input
									ref={fileInputRef}
									onChange={e => onImageChange(e, 'bank_proof_url')}
									accept="image/png, image/jpeg,"
									type="file"
									className="absolute h-fit w-[192px] cursor-pointer opacity-0"
								/>
							</button>
							{errors.bank_proof_url && (
								<p className="mt-1 block text-m-regular text-red-caution">
									Please choose file
								</p>
							)}
						</div>
					</div>
					<div className="border-t border-neutral-40 pt-4"></div>

					<Button isLoading={isLoadingSaveBankAccount} fullWidth>
						Save
					</Button>
				</section>
			</form>
		</Modal>
	);
};

export default FormPaymentSetting;
