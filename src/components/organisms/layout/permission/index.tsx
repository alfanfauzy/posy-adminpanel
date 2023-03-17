import React, { useMemo, useState } from 'react'
import { Button } from 'posy-fnb-core'
import type { ColumnsType } from 'antd/es/table'
import { AiFillDelete, AiFillEdit, AiOutlinePlus } from 'react-icons/ai'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import { PermissionLayoutProps } from './entities'
import { timeStampConverter } from '@/constants/utils'
import AtomTable from '@/atoms/table'
import useToggle from '@/hooks/useToggle'
import HeaderContent from '@/templates/header/header-content'
import { Search } from '@/domain/vo/BaseInput'
import { GetAccessFilterInput } from '@/domain/access/repositories/AccessRepository'
import { useGetAccessViewModal } from '@/view/access/view-modals/GetAccessViewModel'
import { Access } from '@/domain/access/models'
import { useDeleteAccessViewModal } from '@/view/access/view-modals/DeleteAccessViewModel'

const MoleculesFormPermission = dynamic(
  () => import('@/organisms/form/permission'),
)
const ModalConfirmation = dynamic(
  () => import('@/molecules/modal/confirmation'),
)

const PermissionLayout = ({ type }: PermissionLayoutProps) => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [searchParams, setSearchParams] = useState<Search<any>[]>([
    { field: 'is_internal', value: type === 'admin' ? 'true' : 'false' },
  ])
  const [selectedData, setSelectedData] = useState<Access>({
    uuid: '',
    name: '',
    key: '',
    description: '',
    is_internal: false,
    seconds: 0,
  })

  const hooksParams: GetAccessFilterInput = useMemo(
    () => ({
      search: searchParams,
      sort: { field: 'created_at', value: 'desc' },
      page,
      limit,
    }),
    [page, limit, searchParams],
  )

  const {
    data: ListDataRole,
    refetch: handleRefetchTable,
    isLoading,
    pagination,
  } = useGetAccessViewModal(hooksParams)
  const [isEdit, setIsEdit] = useState(false)

  const { value: openModal, toggle: handleOpenModal } = useToggle(false)
  const { value: openModalConfirmation, toggle: handleOpenModalConfirmation } =
    useToggle(false)

  /** Modal Confirmation Action */

  const handleShowConfirmationModal = (data: Access) => {
    handleOpenModalConfirmation()
    setSelectedData(data)
  }

  const handleCloseModalConfirmation = () => {
    handleOpenModalConfirmation()
    setSelectedData({
      uuid: '',
      name: '',
      key: '',
      description: '',
      is_internal: false,
      seconds: 0,
    })
    handleRefetchTable()
  }

  /** ------------------------- */

  /** Modal Add/Edit Action */

  const handleOpenFormModal = () => {
    handleOpenModal()
    if (isEdit) {
      setIsEdit(!isEdit)
    }
  }

  const { deleteAccess, isLoading: isLoadingRemove } = useDeleteAccessViewModal(
    {
      onSuccess() {
        handleCloseModalConfirmation()
        toast.success('Sucessfully delete Permission')
      },
    },
  )

  /** ------------------------- */

  const handleDeleteRole = () => {
    const { uuid } = selectedData

    deleteAccess(uuid)
  }

  const columns: ColumnsType<Access> = [
    {
      title: '#',
      dataIndex: '',
      filterMode: 'tree',
      filterSearch: true,
      render: (value, item, index) => (page - 1) * 10 + index + 1,
    },
    {
      title: 'Permission Name',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Key',
      key: 'key',
      dataIndex: 'key',
    },
    {
      title: 'Description',
      key: 'description',
      dataIndex: 'description',
    },
    {
      title: 'Created At',
      key: 'created_at',
      dataIndex: 'created_at',
      render: (dataValue, record) =>
        timeStampConverter(record?.seconds, 'DD-MM-YYYY HH:mm'),
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
    <main className="mt-4">
      <HeaderContent
        onClick={handleOpenFormModal}
        textButton="Create New Permission"
        iconElement={<AiOutlinePlus />}
      />
      <MoleculesFormPermission
        isOpenModal={openModal}
        handleClose={handleOpenFormModal}
        isEdit={isEdit}
        selectedData={selectedData}
        handleRefetch={handleRefetchTable}
        type={type}
      />
      <ModalConfirmation
        isOpenModal={openModalConfirmation}
        isLoadingRemove={isLoadingRemove}
        title="Modal Confirmation"
        text="Are you sure want to remove ?"
        onClose={handleCloseModalConfirmation}
        onOk={handleDeleteRole}
      />
      <AtomTable
        isLoading={isLoading}
        columns={columns}
        dataSource={ListDataRole}
        onChangePaginationItem={(e: { value: number }) => setLimit(e.value)}
        limitSize={limit}
        pagination={{
          current: page,
          pageSize: limit,
          total: pagination?.total_objs,
          onChange: setPage,
        }}
      />
    </main>
  )
}

export default PermissionLayout
