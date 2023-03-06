import React, { useState } from 'react'
import type { ColumnsType } from 'antd/es/table'
import { AiOutlinePlus } from 'react-icons/ai'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import { DataType } from './entities'
import { dummyRoleList } from 'src/data/role'
import { timeStampConverter } from '@/constants/utils'
import AtomTable from '@/atoms/table'
import useToggle from '@/hooks/useToggle'
import HeaderContent from '@/templates/header/header-content'

const MoleculesFormUserSubscription = dynamic(
  () => import('@/organisms/form/userSubscription'),
)
const ModalConfirmation = dynamic(
  () => import('@/molecules/modal/confirmation'),
)

const UserSubscriptionLayout: React.FC = () => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const [selectedData, setSelectedData] = useState<DataType>({})
  const [isEdit, setIsEdit] = useState(false)

  const { value: openModal, toggle: handleOpenModal } = useToggle(false)
  const { value: openModalConfirmation, toggle: handleOpenModalConfirmation } =
    useToggle(false)

  /** Modal Confirmation Action */

  const handleCloseModalConfirmation = () => {
    handleOpenModalConfirmation()
    setSelectedData({})
  }

  /** ------------------------- */

  /** Modal Add/Edit Action */

  const handleOpenFormModal = () => {
    handleOpenModal()
    if (isEdit) {
      setIsEdit(!isEdit)
    }
  }

  /** ------------------------- */

  const handleDeleteAdmin = () => {
    const { uuid } = selectedData
    /**
     * Todo Remove
     */

    handleCloseModalConfirmation()
    toast.success(`Sucessfully remove data ${uuid}`)
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
      title: 'Restaurant Name',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Subscription Plan',
      key: 'subscription_plan',
      dataIndex: 'subscription_plan',
    },
    {
      title: 'Start Date',
      key: 'start_date',
      dataIndex: 'start_date',
    },
    {
      title: 'Start End',
      key: 'start_end',
      dataIndex: 'start_end',
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
        selectedData={selectedData}
      />
      <ModalConfirmation
        isOpenModal={openModalConfirmation}
        title="Modal Confirmation"
        text="Are you sure want to remove ?"
        onClose={handleCloseModalConfirmation}
        onOk={handleDeleteAdmin}
      />
      <AtomTable
        columns={columns}
        dataSource={dummyRoleList}
        onChangePaginationItem={(e: { value: number }) => setLimit(e.value)}
        limitSize={limit}
        isLoading={false}
        pagination={{
          current: page,
          pageSize: limit,
          total: dummyRoleList.length,
          onChange: setPage,
        }}
      />
    </div>
  )
}

export default UserSubscriptionLayout
