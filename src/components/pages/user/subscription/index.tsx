import AtomTable from '@/atoms/table';
import {timeStampConverter} from '@/constants/utils';
import {UserSubscription} from '@/domain/user-subscription/models';
import {GetUserSubscriptionFilterInput} from '@/domain/user-subscription/repositories/UserSubscriptionRepository';
import {Search} from '@/domain/vo/BaseInput';
import useToggle from '@/hooks/useToggle';
import HeaderContent from '@/templates/header/header-content';
import {useGetUserSubscriptionViewModal} from '@/view/user-subscription/view-modals/GetUserSubscriptionViewModel';
import type {ColumnsType} from 'antd/es/table';
import dynamic from 'next/dynamic';
import React, {useEffect, useMemo, useState} from 'react';
import {AiOutlinePlus} from 'react-icons/ai';

const MoleculesFormUserSubscription = dynamic(
	() => import('@/organisms/form/userSubscription'),
);

type UserSubscriptionLayoutProps = {
	restaurant_uuid?: string;
};

const UserSubscriptionLayout = ({
	restaurant_uuid,
}: UserSubscriptionLayoutProps) => {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [searchParams, setSearchParams] = useState<Array<Search<any>>>([]);

	const hooksParams: GetUserSubscriptionFilterInput = useMemo(
		() => ({
			search: searchParams,
			sort: {field: 'created_at', value: 'desc'},
			page,
			limit,
		}),
		[page, limit, searchParams],
	);

	const {
		data: ListUserSubscription,
		isLoading,
		pagination,
	} = useGetUserSubscriptionViewModal(hooksParams);

	const [isEdit, setIsEdit] = useState(false);

	const {value: openModal, toggle: handleOpenModal} = useToggle(false);

	/** Modal Add/Edit Action */

	const handleOpenFormModal = () => {
		handleOpenModal();
		if (isEdit) {
			setIsEdit(!isEdit);
		}
	};

	const columns: ColumnsType<UserSubscription> = [
		{
			title: '#',
			dataIndex: '',
			filterMode: 'tree',
			filterSearch: true,
			render: (value, item, index) => (page - 1) * 10 + index + 1,
		},
		{
			title: 'Restaurant Name',
			key: 'rest_name',
			dataIndex: 'rest_name',
		},
		{
			title: 'Subscription Plan',
			key: 'sub_name',
			dataIndex: 'sub_name',
		},
		{
			title: 'Subscription Status',
			key: 'status',
			dataIndex: 'status',
		},
		{
			title: 'Start Date',
			key: 'start_date',
			dataIndex: 'start_date',
			render: data => timeStampConverter(data, 'DD MMM YYYY HH:mm'),
		},
		{
			title: 'End Date',
			key: 'end_date',
			dataIndex: 'end_date',
			render: data => timeStampConverter(data, 'DD MMM YYYY HH:mm'),
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
			<HeaderContent
				onClick={handleOpenFormModal}
				textButton="Create New Subscription"
				iconElement={<AiOutlinePlus />}
			/>
			<MoleculesFormUserSubscription
				isOpenModal={openModal}
				handleClose={handleOpenFormModal}
				isEdit={isEdit}
				restaurant_uuid={restaurant_uuid}
			/>

			<AtomTable
				columns={columns}
				dataSource={ListUserSubscription}
				onChangePaginationItem={(e: {value: number}) => setLimit(e.value)}
				limitSize={limit}
				isLoading={isLoading}
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

export default UserSubscriptionLayout;
