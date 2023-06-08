import {Button} from 'posy-fnb-core';
import React, {useContext} from 'react';
import {PaymentSettingContext} from 'store/context/PaymentContext';

const PaymentInformationEmptyStateMolecules = () => {
	const {handleOpenModal} = useContext(PaymentSettingContext);

	return (
		<>
			<p className="mb-4 text-m-medium">
				You haven’t activate payment Integration. Please activate by registering
				your bank account first.
			</p>
			<div className="mb-4 border border-neutral-40"></div>
			<div className="flex justify-between">
				<p className="text-m-medium">
					We provide two types of payment, owned account and manage account.
					<a href="#" className="text-[#654DE4] underline">
						What’s the different?
					</a>
				</p>
				<Button onClick={handleOpenModal}>Add Bank Account</Button>
			</div>
		</>
	);
};

const PaymentInformationWitDataMolecules = () => {
	const {
		handleOpenModal,
		paymentAccountInfoData,
		bankAccountData,
		handleIsEdit,
	} = useContext(PaymentSettingContext);

	const handleModal = () => {
		handleIsEdit(true);
		handleOpenModal();
	};

	const typePayment =
		paymentAccountInfoData?.type === 'OWNED'
			? 'Owned Account'
			: 'Managed Account';

	return (
		<div>
			<div className="mb-4 grid grid-cols-5">
				<section>
					<p className="mb-2 text-m-semibold">Type of payment</p>
					<p className="text-s-regular">{typePayment}</p>
				</section>
				<section>
					<p className="mb-2 text-m-semibold">Bank name</p>
					<p className="text-s-regular">{bankAccountData?.bank_name}</p>
				</section>
				<section>
					<p className="mb-2 text-m-semibold">Account number</p>
					<p className="text-s-regular">{bankAccountData?.account_number}</p>
				</section>
				<section>
					<p className="mb-2 text-m-semibold">Bank account name</p>
					<p className="text-s-regular">{bankAccountData?.account_name}</p>
				</section>
				<section>
					<p className="mb-2 text-m-semibold">Email notification</p>
					<p className="text-s-regular">{bankAccountData?.email}</p>
				</section>
			</div>
			<div className="mb-4 border border-neutral-40"></div>
			<div className="flex justify-end">
				<Button onClick={handleModal}>Edit Information</Button>
			</div>
		</div>
	);
};

const PaymentInformationMolecules = () => {
	const {bankAccountData} = useContext(PaymentSettingContext);

	return (
		<section className="h-auto w-auto gap-5 rounded-md border border-gray-200 bg-white p-4 shadow-md">
			<h1 className="mb-4 text-l-bold">Payment information</h1>
			{bankAccountData !== undefined ? (
				<PaymentInformationWitDataMolecules />
			) : (
				<PaymentInformationEmptyStateMolecules />
			)}
		</section>
	);
};

export default PaymentInformationMolecules;
