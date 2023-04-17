import AtomTable from '@/atoms/table';
import {FormatToRupiah} from '@/constants/utils';
import {Product} from '@/domain/product/models';
import {GetFilterProductInput} from '@/domain/product/repositories/ProductRepository';
import {useAccessControl} from '@/hooks/useAccessControl';
import useToggle from '@/hooks/useToggle';
import HeaderContent from '@/templates/header/header-content';
import {useDeleteProductViewModal} from '@/view/product/view-models/DeleteProductViewModel';
import {useGetProductViewModal} from '@/view/product/view-models/GetProductViewModel';
import type {ColumnsType} from 'antd/es/table';
import dynamic from 'next/dynamic';
import {Button} from 'posy-fnb-core';
import React, {useMemo, useState} from 'react';
import {AiFillDelete, AiFillEdit, AiOutlinePlus} from 'react-icons/ai';
import {toast} from 'react-toastify';

const ModalFormProduct = dynamic(() => import('@/organisms/form/product'));
const ModalConfirmation = dynamic(
	() => import('@/molecules/modal/confirmation'),
);

type ListProductMenuLayoutProps = {
	restaurant_uuid: string;
};

const ListProductMenuLayout = ({
	restaurant_uuid,
}: ListProductMenuLayoutProps) => {
	const {hasAccess} = useAccessControl();
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);

	const hooksParams: GetFilterProductInput = useMemo(
		() => ({
			restaurant_uuid,
			search: [],
			sort: {field: 'created_at', value: 'desc'},
			page,
			limit,
		}),
		[page, limit],
	);

	const {
		data: ListProduct,
		isLoading,
		pagination,
		refetch,
	} = useGetProductViewModal(hooksParams);

	const [selectedData, setSelectedData] = useState<
		Product | Record<string, never>
	>({});
	const [isEdit, setIsEdit] = useState(false);

	const {value: openModal, toggle: handleOpenModal} = useToggle(false);
	const {value: openModalConfirmation, toggle: handleOpenModalConfirmation} =
		useToggle(false);

	/** Modal Confirmation Action */

	const handleShowConfirmationModal = (data: Product) => {
		handleOpenModalConfirmation();
		setSelectedData(data);
	};

	const handleCloseModalConfirmation = () => {
		refetch();
		handleOpenModalConfirmation();
		setSelectedData({});
	};

	/** ------------------------- */

	const {deleteProduct, isLoading: isLoadingRemove} = useDeleteProductViewModal(
		{
			onSuccess() {
				handleCloseModalConfirmation();
				toast.success('Sucessfully delete Product');
			},
		},
	);

	/** Modal Add/Edit Action */

	const handleOpenFormModal = () => {
		handleOpenModal();
		if (isEdit) {
			setIsEdit(!isEdit);
		}
		setSelectedData({});
	};

	/** ------------------------- */

	const handleDeleteAdmin = () => {
		const {uuid} = selectedData;

		deleteProduct(uuid);
	};

	const columns: ColumnsType<Product> = [
		{
			title: 'No',
			dataIndex: '',
			filterMode: 'tree',
			filterSearch: true,
			render: (value, item, index) => (page - 1) * 10 + index + 1,
		},
		{
			title: 'Product Name',
			key: 'product_name',
			dataIndex: 'name',
		},
		{
			title: 'Price',
			key: 'price',
			dataIndex: 'price',
			render: data => FormatToRupiah(data),
		},
		{
			title: 'Action',
			className:
				!hasAccess('product:update') && !hasAccess('product:delete')
					? 'hidden'
					: '',
			render: (dataValue, record, index) => (
				<span className="flex gap-1">
					{hasAccess('product:update') && (
						<Button
							variant="secondary"
							onClick={() => {
								handleOpenFormModal();
								setIsEdit(true);
								setSelectedData(dataValue);
							}}
						>
							<AiFillEdit />
						</Button>
					)}
					{hasAccess('product:delete') && (
						<Button
							variant="red-accent"
							onClick={() => handleShowConfirmationModal(dataValue)}
						>
							<AiFillDelete />
						</Button>
					)}
				</span>
			),
		},
	];

	return (
		<div className="pt-5">
			{hasAccess('product:create') && (
				<HeaderContent
					onClick={handleOpenFormModal}
					textButton="Add Product"
					iconElement={<AiOutlinePlus />}
				/>
			)}
			<ModalFormProduct
				isOpenModal={openModal}
				handleClose={handleOpenFormModal}
				isEdit={isEdit}
				selectedData={selectedData}
			/>
			<ModalConfirmation
				isLoadingRemove={isLoadingRemove}
				isOpenModal={openModalConfirmation}
				title="Modal Confirmation"
				text="Are you sure want to remove ?"
				onClose={handleCloseModalConfirmation}
				onOk={handleDeleteAdmin}
			/>
			<AtomTable
				isLoading={isLoading}
				columns={columns}
				dataSource={ListProduct}
				onChangePaginationItem={(e: {value: number}) => setLimit(e.value)}
				limitSize={limit}
				pagination={{
					current: page,
					pageSize: limit,
					total: pagination?.total_objs,
					onChange: setPage,
				}}
			/>
		</div>
	);
};

export default ListProductMenuLayout;
