/* eslint-disable react/no-unstable-nested-components */
import React, { useMemo } from 'react'
import { Table } from 'antd'
import dynamic from 'next/dynamic'

const Pagination = dynamic(() => import('./Pagination/index'), {
  ssr: false,
})
interface AtomTableProps {
  columns: any
  dataSource: any
  onChange?: any
  pagination?: any
  onChangePaginationItem: (e: { value: number }) => void
  limitSize: number
}

const paginationDefaultProps = {
  pageSize: 10,
}

const AtomTable = ({
  columns,
  dataSource,
  onChange,
  pagination,
  onChangePaginationItem,
  limitSize,
  ...props
}: AtomTableProps) => {
  const paginationProps = useMemo(
    () => Object.assign(paginationDefaultProps, pagination),
    [pagination],
  )

  return (
    <Table
      {...props}
      columns={columns}
      dataSource={dataSource}
      onChange={onChange}
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
  )
}
export default AtomTable
