import {Input} from 'antd';
import type {ColumnType} from 'antd/es/table';
import {Role} from 'core/domain/role/models';
import {Button} from 'posy-fnb-core';
import React from 'react';
import {AiOutlineSearch} from 'react-icons/ai';

const FilterTable = (
	field: string,
	handleSearchParam: (
		fieldSearch: string,
		value: string,
		close: () => void,
	) => void,
	valueSearch: string,
	setValueSearch: any,
	handleResetField: (value: string, close: () => void) => void,
): ColumnType<Role> => ({
	filterDropdown: ({close}) => (
		<section
			className="p-4"
			role="presentation"
			onKeyDown={e => e.stopPropagation()}
		>
			<p className="mb-2 text-m-medium">Search : </p>
			<Input
				placeholder={`Search ${field}`}
				value={valueSearch}
				onChange={e => setValueSearch(e.target.value)}
				onPressEnter={() =>
					handleSearchParam(field as string, valueSearch as string, close)
				}
				style={{marginBottom: 8, display: 'block'}}
			/>
			<span className="mt-3 flex gap-4">
				<Button
					variant="secondary"
					onClick={() =>
						handleSearchParam(field as string, valueSearch as string, close)
					}
					size="xs"
				>
					Search
				</Button>
				<Button
					onClick={() => handleResetField(field as string, close)}
					size="xs"
					variant="red-accent"
				>
					Reset
				</Button>
			</span>
		</section>
	),
	filterIcon: (filtered: boolean) => (
		<AiOutlineSearch style={{color: filtered ? '#1890ff' : undefined}} />
	),
});

export default FilterTable;
