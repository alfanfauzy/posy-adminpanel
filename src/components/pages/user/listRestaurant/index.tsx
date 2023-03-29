import AtomTable from '@/atoms/table';
import {timeStampConverter} from '@/constants/utils';
import {Restaurant} from '@/domain/restaurant/models';
import {GetFilterRestaurantInput} from '@/domain/restaurant/repositories/RestaurantRepository';
import useToggle from '@/hooks/useToggle';
import HeaderContent from '@/templates/header/header-content';
import {useDeleteRestaurantViewModal} from '@/view/restaurant/view-models/DeleteRestaurantViewModel';
import {useGetRestaurantViewModal} from '@/view/restaurant/view-models/GetRestaurantViewModel';
import type {ColumnsType} from 'antd/es/table';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import {Button} from 'posy-fnb-core';
import React, {useState} from 'react';
import {
	AiFillDelete,
	AiFillEdit,
	AiOutlineFolderOpen,
	AiOutlinePlus,
} from 'react-icons/ai';
import {toast} from 'react-toastify';
import {useDispatchApp} from 'store/hooks';
import {restaurantDetail} from 'store/slice/restaurant';

const ModalFormRestaurant = dynamic(
	() => import('@/organisms/form/restaurant'),
);
const ModalConfirmation = dynamic(
	() => import('@/molecules/modal/confirmation'),
);

const ListRestaurantLayout: React.FC = () => {
	const dispatch = useDispatchApp();
	const router = useRouter();
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);

	const hooksParams: GetFilterRestaurantInput = {
		search: [],
		sort: {field: 'created_at', value: 'desc'},
		page,
		limit,
	};

	const [selectedData, setSelectedData] = useState<
		Restaurant | Record<string, never>
	>({});
	const [isEdit, setIsEdit] = useState(false);

	const {value: openModal, toggle: handleOpenModal} = useToggle(false);
	const {value: openModalConfirmation, toggle: handleOpenModalConfirmation} =
		useToggle(false);

	const {
		data: ListRestaurant,
		refetch: handleRefetchTable,
		isLoading,
		pagination,
	} = useGetRestaurantViewModal(hooksParams);

	/** Modal Confirmation Action */

	const handleShowConfirmationModal = (data: Restaurant) => {
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

	const {deleteRestaurant, isLoading: isLoadingRemove} =
		useDeleteRestaurantViewModal({
			onSuccess() {
				handleCloseModalConfirmation();
				toast.success('Sucessfully delete Restaurant');
			},
		});

	const handleDeleteRestaurant = () => {
		const {uuid} = selectedData;
		deleteRestaurant(uuid);
	};

	const columns: ColumnsType<Restaurant> = [
		{
			title: '#',
			dataIndex: '',
			filterMode: 'tree',
			filterSearch: true,
			render: (value, item, index) => (page - 1) * 10 + index + 1,
		},
		{
			title: 'Restaurant Name',
			key: 'name',
			dataIndex: 'name',
		},
		{
			title: 'Email',
			key: 'email',
			dataIndex: 'email',
			render: (dataValue, record) => record.email || '-',
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
			render: (dataValue, record) => (
				<span className="flex gap-1">
					<Button
						variant="primary"
						onClick={() => {
							router.push(`/user/list-restaurant/${record.uuid}`);
							dispatch(restaurantDetail(dataValue));
						}}
					>
						<AiOutlineFolderOpen />
					</Button>
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
		<div>
			<HeaderContent
				onClick={handleOpenFormModal}
				textButton="Add New Restaurant"
				iconElement={<AiOutlinePlus />}
			/>
			<ModalFormRestaurant
				isOpenModal={openModal}
				handleClose={handleOpenFormModal}
				isEdit={isEdit}
				selectedData={selectedData}
				handleRefetch={handleRefetchTable}
			/>
			<ModalConfirmation
				isLoadingRemove={isLoadingRemove}
				isOpenModal={openModalConfirmation}
				title="Modal Confirmation"
				text="Are you sure want to remove ?"
				onClose={handleCloseModalConfirmation}
				onOk={handleDeleteRestaurant}
			/>
			<AtomTable
				isLoading={isLoading}
				columns={columns}
				dataSource={ListRestaurant}
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

export default ListRestaurantLayout;
