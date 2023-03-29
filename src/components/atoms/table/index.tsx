/* eslint-disable react/no-unstable-nested-components */
import {Table} from 'antd';
import dynamic from 'next/dynamic';
import React, {useMemo} from 'react';

const Pagination = dynamic(() => import('./Pagination/index'), {
	ssr: false,
});
type AtomTableProps = {
	columns: any;
	dataSource: any;
	onChange?: any;
	pagination?: any;
	onChangePaginationItem: (e: {value: number}) => void;
	isLoading: boolean;
	limitSize: number;
};

const paginationDefaultProps = {
	pageSize: 10,
};

const AtomTable = ({
	columns,
	dataSource,
	onChange,
	pagination,
	onChangePaginationItem,
	limitSize,
	isLoading,
	...props
}: AtomTableProps) => {
	const paginationProps = useMemo(
		() => Object.assign(paginationDefaultProps, pagination),
		[pagination],
	);

	return (
		<Table
			{...props}
			columns={columns}
			dataSource={dataSource}
			onChange={onChange}
			loading={isLoading}
			pagination={{
				showTotal: (total: number) => (
					<Pagination
						onChangePagination={onChangePaginationItem}
						total={total}
						limitSize={limitSize}
					/>
				),
				...paginationProps,
			}}
		/>
	);
};
export default AtomTable;
