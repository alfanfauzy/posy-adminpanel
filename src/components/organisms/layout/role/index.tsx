import AtomTable from '@/atoms/table';
import FilterTable from '@/atoms/table/filter/input';
import {findIndexArraySearch, timeStampConverter} from '@/constants/utils';
import {useAccessControl} from '@/hooks/useAccessControl';
import useToggle from '@/hooks/useToggle';
import HeaderContent from '@/templates/header/header-content';
import {useDeleteRolesViewModal} from '@/view/role/view-modals/DeleteRoleViewModel';
import type {ColumnsType} from 'antd/es/table';
import {Role} from 'core/domain/role/models';
import {GetRolesInput} from 'core/domain/role/repositories/RoleRepository';
import {Search} from 'core/domain/vo/BaseInput';
import {useGetRolesViewModal} from 'core/view/role/view-modals/GetRolesViewModel';
import dynamic from 'next/dynamic';
import {Button} from 'posy-fnb-core';
import React, {useMemo, useState} from 'react';
import {AiFillDelete, AiFillEdit, AiOutlinePlus} from 'react-icons/ai';
import {toast} from 'react-toastify';

import {RoleLayoutProps} from './entities';

const ModalFormRole = dynamic(() => import('@/organisms/form/role'));
const ModalConfirmation = dynamic(
	() => import('@/molecules/modal/confirmation'),
);

const RoleLayout = ({type, value}: RoleLayoutProps) => {
	const {hasAccess} = useAccessControl();
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [searchParams, setSearchParams] = useState<Array<Search<any>>>([
		{field: 'is_internal', value: type === 'admin' ? 'true' : 'false'},
	]);
	const [valueSearch, setValueSearch] = useState('');

	const hooksParams: GetRolesInput = useMemo(
		() => ({
			search: searchParams,
			sort: {field: 'created_at', value: 'desc'},
			page,
			limit,
		}),
		[page, limit, searchParams],
	);

	const {
		data: ListDataRole,
		refetch: handleRefetchTable,
		isLoading,
		pagination,
	} = useGetRolesViewModal(hooksParams, {enabled: value === 1});

	const [selectedData, setSelectedData] = useState<Role>({
		name: '',
		description: '',
		seconds: 0,
		accesses: [],
		is_internal: false,
		uuid: '',
	});
	const [isEdit, setIsEdit] = useState(false);

	const {value: openModal, toggle: handleOpenModal} = useToggle(false);
	const {value: openModalConfirmation, toggle: handleOpenModalConfirmation} =
		useToggle(false);

	/** Modal Confirmation Action */

	const handleShowConfirmationModal = (data: Role) => {
		handleOpenModalConfirmation();
		setSelectedData(data);
	};

	const handleCloseModalConfirmation = () => {
		handleOpenModalConfirmation();
		setSelectedData({
			name: '',
			description: '',
			seconds: 0,
			is_internal: false,
			accesses: [],
			uuid: '',
		});
		handleRefetchTable();
	};

	const {deleteRole, isLoading: isLoadingRemove} = useDeleteRolesViewModal({
		onSuccess() {
			handleCloseModalConfirmation();
			toast.success('Sucessfully delete Role');
		},
	});

	const handleDeleteRole = () => {
		const {uuid} = selectedData;

		deleteRole(uuid);
	};

	const handleSearchParam = (
		field: string,
		value: string,
		close: () => void,
	) => {
		const filter = [...searchParams];

		const newObject = {
			field,
			value,
		};

		const getIndex = findIndexArraySearch(searchParams, field);

		if (getIndex === -1) {
			setSearchParams([...filter, newObject]);
		}

		if (getIndex !== -1) {
			filter[getIndex].value = value;
			setSearchParams([...filter]);
		}

		close();
	};

	const handleResetField = (field: string, close: () => void) => {
		const getIndex = findIndexArraySearch(searchParams, field);
		const tempSearchParam = [...searchParams];

		if (getIndex !== -1) {
			tempSearchParam.splice(getIndex, 1);
		}

		close();
		setValueSearch('');
		setSearchParams([...tempSearchParam]);
	};

	/** ------------------------- */

	/** Modal Add/Edit Action */

	const handleOpenFormModal = () => {
		handleOpenModal();
		if (isEdit) {
			setIsEdit(!isEdit);
		}
	};

	const columns: ColumnsType<Role> = [
		{
			title: '#',
			dataIndex: '',
			filterMode: 'tree',
			filterSearch: true,
			render: (datavalue, record, index) => (page - 1) * 10 + index + 1,
		},
		{
			title: 'Role Name',
			key: 'name',
			dataIndex: 'name',
			...FilterTable(
				'name',
				handleSearchParam,
				valueSearch,
				setValueSearch,
				handleResetField,
			),
		},
		{
			title: 'Description',
			key: 'description',
			dataIndex: 'description',
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
			className: !hasAccess('role_admin:manage_role') ? 'hidden' : '',
			render: dataValue => (
				<span className="flex gap-1">
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
					<Button
						variant="red-accent"
						onClick={() => handleShowConfirmationModal(dataValue)}
					>
						<AiFillDelete />
					</Button>
				</span>
			),
		},
	];

	return (
		<main className="mt-4">
			{hasAccess('role_admin:manage_role') && (
				<HeaderContent
					onClick={handleOpenFormModal}
					textButton="Create Role"
					iconElement={<AiOutlinePlus />}
				/>
			)}
			<ModalFormRole
				isOpenModal={openModal}
				handleClose={handleOpenFormModal}
				isEdit={isEdit}
				selectedData={selectedData}
				type={type}
			/>
			<ModalConfirmation
				isOpenModal={openModalConfirmation}
				title="Modal Confirmation"
				text="Are you sure want to remove ?"
				onClose={handleCloseModalConfirmation}
				onOk={handleDeleteRole}
				isLoadingRemove={isLoadingRemove}
			/>
			<AtomTable
				isLoading={isLoading}
				columns={columns}
				dataSource={ListDataRole}
				onChangePaginationItem={(e: {value: number}) => {
					setLimit(e.value);
					setPage(1);
				}}
				limitSize={limit}
				pagination={{
					current: page,
					pageSize: limit,
					total: pagination?.total_objs,
					onChange: setPage,
				}}
			/>
		</main>
	);
};

export default RoleLayout;
