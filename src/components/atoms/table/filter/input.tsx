import { Input } from 'antd'
import { Button } from 'posy-fnb-core'
import React from 'react'
import Highlighter from 'react-highlight-words'
import type { ColumnType } from 'antd/es/table'
import { AiOutlineSearch } from 'react-icons/ai'
import { DataType } from '@/pages/admin/list/entities'

type DataIndex = keyof DataType

const FilterTable = (
  dataIndex: DataIndex,
  ref: any,
  handleSearch: any,
  handleReset: any,
  searchText: any,
  searchedColumn: any,
): ColumnType<DataType> => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }) => (
    <section
      className="p-4"
      role="presentation"
      onKeyDown={(e) => e.stopPropagation()}
    >
      <p className="mb-2 text-m-medium">Search : </p>
      <Input
        ref={ref}
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={(e) =>
          setSelectedKeys(e.target.value ? [e.target.value] : [])
        }
        onPressEnter={() =>
          handleSearch(selectedKeys as string[], confirm, dataIndex)
        }
        style={{ marginBottom: 8, display: 'block' }}
      />
      <span className="mt-3 flex gap-4">
        <Button
          variant="secondary"
          onClick={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          size="xs"
        >
          Search
        </Button>
        <Button
          onClick={() => clearFilters && handleReset(clearFilters)}
          size="xs"
          variant="red-accent"
        >
          Reset
        </Button>
      </span>
    </section>
  ),
  filterIcon: (filtered: boolean) => (
    <AiOutlineSearch style={{ color: filtered ? '#1890ff' : undefined }} />
  ),
  onFilter: (value, record: any) =>
    record[dataIndex]
      .toString()
      .toLowerCase()
      .includes((value as string).toLowerCase()),
  onFilterDropdownOpenChange: (visible) => {
    if (visible) {
      setTimeout(() => ref.current?.select(), 100)
    }
  },
  render: (text) =>
    searchedColumn === dataIndex ? (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ''}
      />
    ) : (
      text
    ),
})

export default FilterTable
