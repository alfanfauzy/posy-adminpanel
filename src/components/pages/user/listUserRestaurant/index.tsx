import React, { useState } from 'react'
import { Button } from 'posy-fnb-core'
import type { ColumnsType } from 'antd/es/table'
import { AiFillDelete, AiFillEdit, AiOutlinePlus } from 'react-icons/ai'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import { timeStampConverter } from '@/constants/utils'
import AtomTable from '@/atoms/table'
import useToggle from '@/hooks/useToggle'
import HeaderContent from '@/templates/header/header-content'
import { useGetUserRestaurantViewModal } from '@/view/user-restaurant/view-modals/GetUserRestaurantViewModel'
import { GetUserRestaurantFilterInput } from '@/domain/user-restaurant/repositories/UserRestaurantRepository'
import { UserRestaurant } from '@/domain/user-restaurant/models'
import { RestaurantObject } from '@/data/user-restaurant/types'
import { useDeleteUserRestaurantViewModal } from '@/view/user-restaurant/view-modals/DeleteUserRestaurantViewModel'

const MoleculesFormUserRestaurant = dynamic(
  () => import('@/organisms/form/userRestaurant'),
)
const ModalConfirmation = dynamic(
  () => import('@/molecules/modal/confirmation'),
)

const ListUserRestaurantLayout: React.FC = () => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const hooksParams: GetUserRestaurantFilterInput = {
    search: [{ field: 'is_admin', value: 'false' }],
    sort: { field: 'created_at', value: 'desc' },
    page,
    limit,
  }

  const {
    data: ListUserRestaurant,
    refetch: handleRefetchTable,
    isLoading,
    pagination,
  } = useGetUserRestaurantViewModal(hooksParams)

  const [selectedData, setSelectedData] = useState<
    UserRestaurant | Record<string, never>
  >({})
  const [isEdit, setIsEdit] = useState(false)

  const { value: openModal, toggle: handleOpenModal } = useToggle(false)
  const { value: openModalConfirmation, toggle: handleOpenModalConfirmation } =
    useToggle(false)

  /** Modal Confirmation Action */

  const handleShowConfirmationModal = (data: UserRestaurant) => {
    handleOpenModalConfirmation()
    setSelectedData(data)
  }

  const handleCloseModalConfirmation = () => {
    handleOpenModalConfirmation()
    setSelectedData({})
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

  /** ------------------------- */

  const { deleteUserRestaurant, isLoading: isLoadingRemove } =
    useDeleteUserRestaurantViewModal({
      onSuccess() {
        handleCloseModalConfirmation()
        toast.success('Sucessfully delete USer Restaurant')
      },
    })

  const handleDeleteAdmin = () => {
    const { uuid } = selectedData
    deleteUserRestaurant(uuid)
  }

  const columns: ColumnsType<UserRestaurant> = [
    {
      title: '#',
      dataIndex: '',
      filterMode: 'tree',
      filterSearch: true,
      render: (value, item, index) => (page - 1) * 10 + index + 1,
    },
    {
      title: 'Full Name',
      key: 'name',
      dataIndex: 'name',
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
      render: (value) => {
        if (!value) return <p>-</p>
        return (
          <p className="truncate">
            {value?.map((role: RestaurantObject) => role.outlet_name)}
          </p>
        )
      },
    },
    {
      title: 'Created At',
      key: 'seconds',
      dataIndex: 'seconds',
      render: (value) => timeStampConverter(value, 'DD-MM-YYYY HH:mm'),
    },

    {
      title: 'Action',
      render: (dataValue) => (
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
        handleRefetch={handleRefetchTable}
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
        dataSource={ListUserRestaurant}
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

export default ListUserRestaurantLayout
