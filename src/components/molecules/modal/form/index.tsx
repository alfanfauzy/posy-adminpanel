import {Modal} from 'posy-fnb-core';
import React from 'react';

type ModalFormProps = {
	isOpenModal: boolean;
	handleCloseModal: () => void;
	children: React.ReactNode;
	title?: string;
	isLoading?: boolean;
};

const ModalForm = ({
	isOpenModal,
	handleCloseModal,
	children,
	title,
	isLoading,
}: ModalFormProps) => (
	<Modal
		isLoading={isLoading}
		open={isOpenModal}
		handleClose={handleCloseModal}
		showCloseButton
		overflow
		className="overflow-auto"
		title={title}
	>
		{children}
	</Modal>
);

export default ModalForm;
