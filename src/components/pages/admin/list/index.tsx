import AtomTable from '@/atoms/table';
import AtomTag from '@/atoms/tag';
import {timeStampConverter} from '@/constants/utils';
import {Admin} from '@/domain/admin/models';
import {GetFilterAdminInput} from '@/domain/admin/repositories/AdminRepository';
import {useAccessControl} from '@/hooks/useAccessControl';
import useToggle from '@/hooks/useToggle';
import HeaderContent from '@/templates/header/header-content';
import {useDeleteAdminViewModal} from '@/view/admin/view-models/DeleteAdminViewModel';
import {useGetAdminViewModal} from '@/view/admin/view-models/GetAdminViewModel';
import type {ColumnsType} from 'antd/es/table';
import dynamic from 'next/dynamic';
import {Button} from 'posy-fnb-core';
import React, {useEffect, useMemo, useState} from 'react';
import {AiFillDelete, AiFillEdit, AiOutlineUserAdd} from 'react-icons/ai';
import {toast} from 'react-toastify';

const ModalFormAdmin = dynamic(() => import('@/organisms/form/admin'));
const ModalConfirmation = dynamic(
	() => import('@/molecules/modal/confirmation'),
);

const AdminListLayout: React.FC = () => {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);

	const {hasAccess} = useAccessControl();

	const hooksParams: GetFilterAdminInput = useMemo(
		() => ({
			search: [{field: 'is_admin', value: 'true'}],
			sort: {field: 'created_at', value: 'desc'},
			page,
			limit,
		}),
		[page, limit],
	);

	const {
		data: ListUser,
		refetch: handleRefetchTable,
		isLoading,
		pagination,
	} = useGetAdminViewModal(hooksParams);

	const [selectedData, setSelectedData] = useState<
		Admin | Record<string, never>
	>({});
	const [isEdit, setIsEdit] = useState(false);

	const {value: openModal, toggle: handleOpenModal} = useToggle(false);
	const {value: openModalConfirmation, toggle: handleOpenModalConfirmation} =
		useToggle(false);

	/** Modal Confirmation Action */

	const handleShowConfirmationModal = (data: Admin) => {
		handleOpenModalConfirmation();
		setSelectedData(data);
	};

	const handleCloseModalConfirmation = () => {
		handleOpenModalConfirmation();
		setSelectedData({});
		handleRefetchTable();
	};

	/** ------------------------- */

	/** Modal Add/Edit Action */

	const handleOpenFormModal = () => {
		handleOpenModal();
		if (isEdit) {
			setIsEdit(!isEdit);
		}
	};

	/** ------------------------- */

	const {deleteAdmin, isLoading: isLoadingRemove} = useDeleteAdminViewModal({
		onSuccess() {
			handleCloseModalConfirmation();
			toast.success('Sucessfully delete Role');
		},
	});

	const handleDeleteAdmin = () => {
		const {uuid} = selectedData;

		deleteAdmin(uuid);
	};

	const columns: ColumnsType<Admin> = [
		{
			title: '#',
			dataIndex: '',
			filterMode: 'tree',
			filterSearch: true,
			render: (value, item, index) => (page - 1) * 10 + index + 1,
		},
		{
			title: 'Full Name',
			key: 'fullname',
			dataIndex: 'fullname',
		},
		{
			title: 'Email',
			key: 'name',
			dataIndex: 'email',
		},
		{
			title: 'Role',
			key: 'role',
			render: (dataValue, record) =>
				record.roleid !== undefined ? (
					<AtomTag status={record.rolename} />
				) : (
					<p>-</p>
				),
		},
		{
			title: 'Created At',
			key: 'created_at',
			dataIndex: 'created_at',
			render: (dataValue, record) =>
				timeStampConverter(record.seconds, 'DD-MM-YYYY HH:mm'),
		},
		{
			title: 'Action',
			className:
				!hasAccess('admin:update') && !hasAccess('admin:delete')
					? 'hidden'
					: '',
			render: dataValue => (
				<span className="flex gap-1">
					{hasAccess('admin:update') && (
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
					{hasAccess('admin:delete') && (
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
		<div>
			{hasAccess('admin:create') && (
				<HeaderContent
					onClick={handleOpenFormModal}
					textButton="Create Admin"
					iconElement={<AiOutlineUserAdd />}
				/>
			)}
			<ModalFormAdmin
				isOpenModal={openModal}
				handleClose={handleOpenFormModal}
				isEdit={isEdit}
				selectedData={selectedData}
			/>
			<ModalConfirmation
				isOpenModal={openModalConfirmation}
				title="Confirmation"
				text="Are you sure want to remove ?"
				onClose={handleCloseModalConfirmation}
				onOk={handleDeleteAdmin}
				isLoadingRemove={isLoadingRemove}
			/>
			<AtomTable
				isLoading={isLoading}
				columns={columns}
				dataSource={ListUser}
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

export default AdminListLayout;
