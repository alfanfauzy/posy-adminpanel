import React, { useState } from 'react'
import type { ColumnsType } from 'antd/es/table'
import { AiOutlinePlus } from 'react-icons/ai'
import dynamic from 'next/dynamic'
import { DataType } from './entities'
import { dummy } from 'src/data'
import { timeStampConverter } from '@/constants/utils'
import AtomTable from '@/atoms/table'
import useToggle from '@/hooks/useToggle'
import HeaderContent from '@/templates/header/header-content'

const ModalFormSubscription = dynamic(
  () => import('@/organisms/form/subscription'),
)

const SubscriotionPage: React.FC = () => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const [selectedData, setSelectedData] = useState<DataType>({})
  const [isEdit, setIsEdit] = useState(false)

  const { value: openModal, toggle: handleOpenModal } = useToggle(false)

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
      title: 'Subscription Name',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Subscription Period',
      key: 'period',
      dataIndex: 'period',
    },
    {
      title: 'Subscription Price',
      key: 'price',
      dataIndex: 'price',
    },
    {
      title: 'Created At',
      key: 'created_at',
      dataIndex: 'created_at',
      sorter: (a: any, b: any) => a.created_at.seconds - b.created_at.seconds,
      render: (dataValue, record: any) =>
        timeStampConverter(record?.created_at?.seconds, 'DD-MM-YYYY HH:mm'),
    },
  ]

  return (
    <div>
      <HeaderContent
        onClick={handleOpenFormModal}
        textButton="Create New Subscription Plan"
        iconElement={<AiOutlinePlus />}
      />
      <ModalFormSubscription
        isOpenModal={openModal}
        handleClose={handleOpenFormModal}
        isEdit={isEdit}
        selectedData={selectedData}
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

export default SubscriotionPage
