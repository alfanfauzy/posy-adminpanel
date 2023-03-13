import React, { useMemo, useState } from 'react'
import { Button } from 'posy-fnb-core'
import type { ColumnsType } from 'antd/es/table'
import { AiFillDelete, AiFillEdit, AiOutlineUserAdd } from 'react-icons/ai'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import { timeStampConverter } from '@/constants/utils'
import AtomTag from '@/atoms/tag'
import AtomTable from '@/atoms/table'
import useToggle from '@/hooks/useToggle'
import HeaderContent from '@/templates/header/header-content'
import { Search } from '@/domain/vo/BaseInput'
import { GetFilterAdminInput } from '@/domain/admin/repositories/AdminRepository'
import { useGetAdminViewModal } from '@/view/admin/view-models/GetAdminViewModel'
import { Admin } from '@/domain/admin/models'
import { useDeleteAdminViewModal } from '@/view/admin/view-models/DeleteAdminViewModel'

const ModalFormAdmin = dynamic(() => import('@/organisms/form/admin'))
const ModalConfirmation = dynamic(
  () => import('@/molecules/modal/confirmation'),
)

const AdminListLayout: React.FC = () => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [searchParams, setSearchParams] = useState<Search<any>[]>([])

  const hooksParams: GetFilterAdminInput = useMemo(
    () => ({
      search: searchParams,
      sort: { field: 'created_at', value: 'desc' },
      page,
      limit,
    }),
    [page, limit, searchParams],
  )

  const {
    data: ListUser,
    refetch: handleRefetchTable,
    isLoading,
    pagination,
  } = useGetAdminViewModal(hooksParams)

  const [selectedData, setSelectedData] = useState<
    Admin | Record<string, never>
  >({})
  const [isEdit, setIsEdit] = useState(false)

  const { value: openModal, toggle: handleOpenModal } = useToggle(false)
  const { value: openModalConfirmation, toggle: handleOpenModalConfirmation } =
    useToggle(false)

  /** Modal Confirmation Action */

  const handleShowConfirmationModal = (data: Admin) => {
    handleOpenModalConfirmation()
    setSelectedData(data)
  }

  const handleCloseModalConfirmation = () => {
    handleOpenModalConfirmation()
    setSelectedData({})
    // handleRefetchTable()
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

  const { deleteAdmin, isLoading: isLoadingRemove } = useDeleteAdminViewModal({
    onSuccess() {
      handleCloseModalConfirmation()
      toast.success('Sucessfully delete Role')
    },
  })

  const handleDeleteAdmin = () => {
    const { uuid } = selectedData

    deleteAdmin(uuid)
  }

  const columns: ColumnsType<Admin> = [
    {
      title: '#',
      dataIndex: '',
      filterMode: 'tree',
      filterSearch: true,
      render: (value, item, index) => (page - 1) * 10 + index + 1,
    },
    {
      title: 'Fullname',
      key: 'fullname',
      dataIndex: 'fullname',
    },
    {
      title: 'Email',
      key: 'name',
      dataIndex: 'email',
    },
    {
      title: 'Role',
      key: 'role',
      render: (dataValue, record) => <AtomTag status={record.rolename} />,
    },
    {
      title: 'Created At',
      key: 'created_at',
      dataIndex: 'created_at',
      render: (dataValue, record) =>
        timeStampConverter(record.seconds, 'DD-MM-YYYY HH:mm'),
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
        handleRefecth={handleRefetchTable}
      />
      <ModalConfirmation
        isOpenModal={openModalConfirmation}
        title="Modal Confirmation"
        text="Are you sure want to remove ?"
        onClose={handleCloseModalConfirmation}
        onOk={handleDeleteAdmin}
        isLoadingRemove={isLoadingRemove}
      />
      <AtomTable
        isLoading={isLoading}
        columns={columns}
        dataSource={ListUser}
        onChangePaginationItem={(e: { value: number }) => setLimit(e.value)}
        limitSize={limit}
        pagination={{
          current: page,
          pageSize: limit,
          total: pagination?.total_objs,
          onChange: setPage,
        }}
      />
    </div>
  )
}

export default AdminListLayout
