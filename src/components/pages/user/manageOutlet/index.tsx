import AtomTable from '@/atoms/table';
import {timeStampConverter} from '@/constants/utils';
import {Outlet} from '@/domain/outlet/models';
import {GetFilterOutletInput} from '@/domain/outlet/repositories/OutletRepositories';
import {Search} from '@/domain/vo/BaseInput';
import {useAccessControl} from '@/hooks/useAccessControl';
import useToggle from '@/hooks/useToggle';
import HeaderContent from '@/templates/header/header-content';
import {useDeleteOutletViewModal} from '@/view/outlet/view-models/DeleteOutletViewModel';
import {useGetOutletViewModal} from '@/view/outlet/view-models/GetOutletViewModel';
import type {ColumnsType} from 'antd/es/table';
import dynamic from 'next/dynamic';
import {Button} from 'posy-fnb-core';
import React, {useMemo, useState, useEffect} from 'react';
import {AiFillDelete, AiFillEdit, AiOutlinePlus} from 'react-icons/ai';
import {toast} from 'react-toastify';

const MoleculesFormManageOutlet = dynamic(
	() => import('@/organisms/form/outlet'),
);
const ModalConfirmation = dynamic(
	() => import('@/molecules/modal/confirmation'),
);

type ManageOutletLayoutProps = {
	restaurant_uuid?: string;
};

const ManageOutletLayout = ({restaurant_uuid}: ManageOutletLayoutProps) => {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const {hasAccess} = useAccessControl();
	const [searchParams, setSearchParams] = useState<Array<Search<any>>>([]);

	const hooksParams: GetFilterOutletInput = useMemo(
		() => ({
			search: searchParams,
			sort: {field: 'created_at', value: 'desc'},
			page,
			limit,
		}),
		[page, limit, searchParams],
	);

	const {
		data: ListOutlet,
		refetch: handleRefetchTable,
		isLoading,
		pagination,
	} = useGetOutletViewModal(hooksParams);

	const [selectedData, setSelectedData] = useState<
		Outlet | Record<string, never>
	>({});
	const [isEdit, setIsEdit] = useState(false);

	const {value: openModal, toggle: handleOpenModal} = useToggle(false);
	const {value: openModalConfirmation, toggle: handleOpenModalConfirmation} =
		useToggle(false);

	/** Modal Confirmation Action */

	const handleShowConfirmationModal = (data: Outlet) => {
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

	const {deleteOutlet, isLoading: isLoadingRemove} = useDeleteOutletViewModal({
		onSuccess() {
			handleCloseModalConfirmation();
			toast.success('Sucessfully delete Outlet');
		},
	});

	const handleDeleteOutlet = () => {
		const {uuid} = selectedData;

		deleteOutlet(uuid);
	};

	const columns: ColumnsType<Outlet> = [
		{
			title: '#',
			dataIndex: '',
			filterMode: 'tree',
			filterSearch: true,
			render: (value, item, index) => (page - 1) * 10 + index + 1,
		},
		{
			title: 'Restaurant',
			key: 'restaurant_name',
			dataIndex: 'restaurant_name',
		},
		{
			title: 'Outlet',
			key: 'outlet_name',
			dataIndex: 'outlet_name',
		},
		{
			title: 'City',
			key: 'city_name',
			dataIndex: 'city_name',
		},
		{
			title: 'Address',
			key: 'address',
			dataIndex: 'address',
		},
		{
			title: 'Phone',
			key: 'phone',
			dataIndex: 'phone',
		},
		{
			title: 'Created At',
			key: 'seconds',
			dataIndex: 'seconds',
			render: value => timeStampConverter(value, 'DD-MM-YYYY HH:mm'),
		},

		{
			title: 'Action',
			className:
				!hasAccess('restaurant_outlet:update') &&
				!hasAccess('restaurant_outlet:delete')
					? 'hidden'
					: '',
			render: (dataValue, record, index) => (
				<span className="flex gap-1">
					{hasAccess('restaurant_outlet:update') && (
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
					{hasAccess('restaurant_outlet:update') && (
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

	useEffect(() => {
		if (restaurant_uuid) {
			setSearchParams(prevState => [
				...prevState,
				{field: 'restaurant_uuid', value: restaurant_uuid},
			]);
		}
	}, [restaurant_uuid]);

	return (
		<div className="pt-5">
			{hasAccess('restaurant_outlet:create') && (
				<HeaderContent
					onClick={handleOpenFormModal}
					textButton="Add New Outlet"
					iconElement={<AiOutlinePlus />}
				/>
			)}
			<MoleculesFormManageOutlet
				isOpenModal={openModal}
				handleClose={handleOpenFormModal}
				isEdit={isEdit}
				selectedData={selectedData}
			/>
			<ModalConfirmation
				isLoadingRemove={isLoadingRemove}
				isOpenModal={openModalConfirmation}
				title="Confirmation"
				text="Are you sure want to remove ?"
				onClose={handleCloseModalConfirmation}
				onOk={handleDeleteOutlet}
			/>
			<AtomTable
				isLoading={isLoading}
				columns={columns}
				dataSource={ListOutlet}
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

export default ManageOutletLayout;
