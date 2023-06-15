import {Select} from 'posy-fnb-core';

type PaginationProps = {
	onChangePagination?: (e: {value: number}) => void;
	total: number;
	limitSize?: number;
};

type PaginationSelectProps = {
	onChangePagination?: (e: {value: number}) => void;
	limitSize?: number;
};

const PaginationSelect = ({
	onChangePagination,
	limitSize,
}: PaginationSelectProps) => {
	const pageSizeOptions = [10, 20, 30, 40, 50];

	const options = pageSizeOptions.map((data: number) => ({
		value: Number(data),
		label: `${data}`,
	}));

	return (
		<Select
			size="m"
			value={{
				label: limitSize?.toString() as string,
				value: limitSize as number,
			}}
			onChange={onChangePagination}
			style={{width: 'auto'}}
			options={options}
		/>
	);
};

const Pagination = ({
	onChangePagination,
	total,
	limitSize,
}: PaginationProps) => (
	<span className="absolute left-0 flex w-64 items-center justify-center gap-2">
		Showing
		<PaginationSelect
			onChangePagination={onChangePagination}
			limitSize={limitSize}
		/>
		of {total}
	</span>
);

export default Pagination;
