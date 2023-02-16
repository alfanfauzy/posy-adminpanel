import React, { useState } from 'react'
import { Button } from 'posy-fnb-core'
import type { ColumnsType } from 'antd/es/table'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { MdFileDownload } from 'react-icons/md'
import { DataType } from './entities'
import { dummy } from 'src/data/restaurant'
import AtomTable from '@/atoms/table'
import useToggle from '@/hooks/useToggle'
import HeaderContent from '@/templates/header/header-content'

const HistoryTransactionLayout: React.FC = () => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const [selectedData, setSelectedData] = useState<DataType>({})
  const [isEdit, setIsEdit] = useState(false)

  const { value: openModal, toggle: handleOpenModal } = useToggle(false)
  const { value: openModalConfirmation, toggle: handleOpenModalConfirmation } =
    useToggle(false)

  /** Modal Confirmation Action */

  const handleShowConfirmationModal = (data: DataType) => {
    handleOpenModalConfirmation()
    setSelectedData(data)
  }

  /** ------------------------- */

  /** Modal Add/Edit Action */

  const handleOpenFormModal = () => {
    handleOpenModal()
    if (isEdit) {
      setIsEdit(!isEdit)
    }
  }

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
    {
      title: 'Action',
      render: (dataValue, record, index) => (
        <Button
          variant="secondary"
          onClick={() => {
            handleOpenFormModal()
            setIsEdit(true)
            setSelectedData(dataValue)
          }}
        >
          Detail
        </Button>
      ),
    },
  ]

  return (
    <div>
      <HeaderContent
        onClick={handleOpenFormModal}
        textButton="Export"
        iconElement={<MdFileDownload />}
        flexEnd
      />
      <AtomTable
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
