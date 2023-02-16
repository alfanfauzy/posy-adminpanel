import React, { useRef, useState } from 'react'
import type { InputRef } from 'antd'
import { Button } from 'posy-fnb-core'
import type { ColumnsType } from 'antd/es/table'
import type { FilterConfirmProps } from 'antd/es/table/interface'
import { AiFillDelete, AiFillEdit, AiOutlineUserAdd } from 'react-icons/ai'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import { DataType } from './entities'
import { dummy } from 'src/data'
import { timeStampConverter } from '@/constants/utils'
import AtomTag from '@/atoms/tag'
import AtomTable from '@/atoms/table'
import FilterTable from '@/atoms/table/filter/input'
import useToggle from '@/hooks/useToggle'
import HeaderContent from '@/templates/header/header-content'

const ModalFormAdmin = dynamic(() => import('@/organisms/form/admin'))
const ModalConfirmation = dynamic(
  () => import('@/molecules/modal/confirmation'),
)

type DataIndex = keyof DataType

const AdminListLayout: React.FC = () => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const ref = useRef<InputRef>(null)

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

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
    setSearchText('')
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
      title: 'Username',
      key: 'username',
      dataIndex: 'username',
      ...FilterTable(
        'username',
        ref,
        handleSearch,
        handleReset,
        searchText,
        searchedColumn,
      ),
    },
    {
      title: 'Full Name',
      key: 'fullname',
      dataIndex: 'fullname',
      ...FilterTable(
        'fullname',
        ref,
        handleSearch,
        handleReset,
        searchText,
        searchedColumn,
      ),
    },
    {
      title: 'Role',
      key: 'role',
      render: (dataValue, record: any) => (
        <AtomTag status={record?.role[0]?.name} />
      ),
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
        textButton="Create Admin"
        iconElement={<AiOutlineUserAdd />}
      />
      <ModalFormAdmin
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

export default AdminListLayout
