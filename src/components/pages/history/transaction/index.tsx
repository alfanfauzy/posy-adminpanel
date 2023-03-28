import React, { useState } from 'react'
import type { ColumnsType } from 'antd/es/table'
import { DataType } from './entities'
import { dummy } from 'src/data/restaurant'
import AtomTable from '@/atoms/table'

const HistoryTransactionLayout: React.FC = () => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  /** Modal Confirmation Action */

  const columns: ColumnsType<DataType> = [
    {
      title: '#',
      dataIndex: '',
      filterMode: 'tree',
      filterSearch: true,
      render: (value, item, index) => (page - 1) * 10 + index + 1,
    },
    {
      title: 'Trx ID',
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: 'Date',
      key: 'date',
      dataIndex: 'date',
    },
    {
      title: 'Restaurant',
      key: 'restaurant',
      dataIndex: 'restaurant',
    },
    {
      title: 'Outlet',
      key: 'outlet',
      dataIndex: 'outlet',
    },
    {
      title: 'Amount',
      key: 'amount',
      dataIndex: 'amount',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
    },
  ]

  return (
    <div>
      <AtomTable
        isLoading={false}
        columns={columns}
        dataSource={dummy}
        onChangePaginationItem={(e: { value: number }) => setLimit(e.value)}
        limitSize={limit}
        pagination={{
          current: page,
          pageSize: limit,
          total: dummy.length,
          onChange: setPage,
        }}
      />
    </div>
  )
}

export default HistoryTransactionLayout
