import AtomTable from '@/atoms/table';
import {Category} from '@/domain/category/models';
import {GetFilterCategoryInput} from '@/domain/category/repositories/CategoryRepository';
import {useAccessControl} from '@/hooks/useAccessControl';
import useToggle from '@/hooks/useToggle';
import MoleculesSwitchStatusCategory from '@/molecules/moleculesSwitch';
import HeaderContent from '@/templates/header/header-content';
import {useGetCategoryViewModal} from '@/view/category/view-modals/GetCatalogViewModel';
import type {ColumnsType} from 'antd/es/table';
import dynamic from 'next/dynamic';
import React, {useMemo, useState} from 'react';
import {AiOutlinePlus} from 'react-icons/ai';

const ModalFormCategory = dynamic(() => import('@/organisms/form/category'));

type CategoryLayoutProps = {
	restaurant_uuid: string;
};

const CategoryLayout = ({restaurant_uuid}: CategoryLayoutProps) => {
	const {hasAccess} = useAccessControl();
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);

	const hooksParams: GetFilterCategoryInput = useMemo(
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
		data: ListCategory,
		isLoading,
		pagination,
	} = useGetCategoryViewModal(hooksParams);

	const [isEdit, setIsEdit] = useState(false);

	const {value: openModal, toggle: handleOpenModal} = useToggle(false);

	/** Modal Add/Edit Action */

	const handleOpenFormModal = () => {
		handleOpenModal();
		if (isEdit) {
			setIsEdit(!isEdit);
		}
	};

	const columns: ColumnsType<Category> = [
		{
			title: '#',
			dataIndex: '',
			filterMode: 'tree',
			filterSearch: true,
			render: (value, item, index) => (page - 1) * 10 + index + 1,
		},
		{
			title: 'Name',
			key: 'name',
			dataIndex: 'name',
		},
		{
			title: 'Display',
			key: 'is_active',
			dataIndex: 'is_active',
			render: (data, item) => (
				<MoleculesSwitchStatusCategory
					item={item}
					data={data}
					disabled={hasAccess('product_category:updategi')}
				/>
			),
		},
	];

	return (
		<div className="pt-5">
			{hasAccess('product_category:create') && (
				<HeaderContent
					onClick={handleOpenFormModal}
					textButton="Add New Category"
					iconElement={<AiOutlinePlus />}
				/>
			)}
			<ModalFormCategory
				isOpenModal={openModal}
				handleClose={handleOpenFormModal}
				isEdit={false}
				selectedData={{}}
			/>
			<AtomTable
				isLoading={isLoading}
				columns={columns}
				dataSource={ListCategory}
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

export default CategoryLayout;
