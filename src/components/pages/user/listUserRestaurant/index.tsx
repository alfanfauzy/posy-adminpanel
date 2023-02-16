import React, { useState } from 'react'
import { Button } from 'posy-fnb-core'
import type { ColumnsType } from 'antd/es/table'
import { AiFillDelete, AiFillEdit, AiOutlinePlus } from 'react-icons/ai'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import { DataType } from './entities'
import { dummy } from 'src/data/userRestaurants'
import { timeStampConverter } from '@/constants/utils'
import AtomTable from '@/atoms/table'
import useToggle from '@/hooks/useToggle'
import HeaderContent from '@/templates/header/header-content'

const MoleculesFormUserRestaurant = dynamic(
  () => import('@/organisms/form/userRestaurant'),
)
const ModalConfirmation = dynamic(
  () => import('@/molecules/modal/confirmation'),
)

const ListUserRestaurantLayout: React.FC = () => {
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
      title: 'Full Name',
      key: 'fullname',
      dataIndex: 'fullname',
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
    },
    {
      title: 'Phone',
      key: 'phone',
      dataIndex: 'phone',
    },
    {
      title: 'Role',
      key: 'roles',
      dataIndex: 'roles',
    },
    {
      title: 'Outlet',
      key: 'outlet',
      dataIndex: 'outlet',
    },
    {
      title: 'Created At',
      key: 'created_at',
      dataIndex: 'created_at',
      sorter: (a: any, b: any) => a.created_at.seconds - b.created_at.seconds,
      render: (dataValue, record: any) =>
        timeStampConverter(record?.created_at?.seconds, 'DD-MM-YYYY HH:mm'),
    },

    {
      title: 'Action',
      render: (dataValue, record, index) => (
        <span className="flex gap-1">
          <Button
            variant="secondary"
            onClick={() => {
              handleOpenFormModal()
              setIsEdit(true)
              setSelectedData(dataValue)
            }}
          >
            <AiFillEdit />
          </Button>
          <Button
            variant="red-accent"
            onClick={() => handleShowConfirmationModal(dataValue)}
          >
            <AiFillDelete />
          </Button>
        </span>
      ),
    },
  ]

  return (
    <div>
      <HeaderContent
        onClick={handleOpenFormModal}
        textButton="Add New User Restaurant"
        iconElement={<AiOutlinePlus />}
      />
      <MoleculesFormUserRestaurant
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

export default ListUserRestaurantLayout
