import React, { useMemo, useState } from 'react'
import type { ColumnsType } from 'antd/es/table'
import { AiFillDelete, AiFillEdit, AiOutlinePlus } from 'react-icons/ai'
import dynamic from 'next/dynamic'
import { Button } from 'posy-fnb-core'
import { toast } from 'react-toastify'
import { FormatToRupiah, timeStampConverter } from '@/constants/utils'
import AtomTable from '@/atoms/table'
import useToggle from '@/hooks/useToggle'
import HeaderContent from '@/templates/header/header-content'
import { Search } from '@/domain/vo/BaseInput'
import { GetSubscriptionFilterInput } from '@/domain/subscription/repositories/SubscriptionRepository'
import { useGetSubscriptionViewModal } from '@/view/subscription/view-modals/GetSubscriptionViewModel'
import { Subscription } from '@/domain/subscription/models'
import ModalConfirmation from '@/molecules/modal/confirmation'
import { Subscription_Period } from '@/constants/index'
import { useDeleteSubscriptionViewModal } from '@/view/subscription/view-modals/DeleteSubscriptionViewModel'

const ModalFormSubscription = dynamic(
  () => import('@/organisms/form/subscription'),
)

const SubscriptionLayout: React.FC = () => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [searchParams, setSearchParams] = useState<Search<any>[]>([])
  const [isEdit, setIsEdit] = useState(false)

  const hooksParams: GetSubscriptionFilterInput = useMemo(
    () => ({
      search: searchParams,
      sort: { field: 'created_at', value: 'desc' },
      page,
      limit,
    }),
    [page, limit, searchParams],
  )

  const {
    data: ListSubscription,
    refetch: handleRefetchTable,
    isLoading,
    pagination,
  } = useGetSubscriptionViewModal(hooksParams)

  const [selectedData, setSelectedData] = useState<Subscription>({
    uuid: '',
    name: '',
    period: 0,
    price: 0,
    seconds: 0,
    description: '',
  })

  const { value: openModal, toggle: handleOpenModal } = useToggle(false)
  const { value: openModalConfirmation, toggle: handleOpenModalConfirmation } =
    useToggle(false)

  /** Modal Confirmation Action */

  const handleShowConfirmationModal = (data: Subscription) => {
    handleOpenModalConfirmation()
    setSelectedData(data)
  }

  const handleCloseModalConfirmation = () => {
    handleOpenModalConfirmation()
    setSelectedData({
      uuid: '',
      name: '',
      period: 0,
      price: 0,
      seconds: 0,
      description: '',
    })
    handleRefetchTable()
  }

  const { deleteSubscription, isLoading: isLoadingRemove } =
    useDeleteSubscriptionViewModal({
      onSuccess() {
        handleCloseModalConfirmation()
        toast.success('Sucessfully delete Role')
      },
    })

  const handleDeleteSubscription = () => {
    const { uuid } = selectedData

    deleteSubscription(uuid)
  }
  /** Modal Add/Edit Action */

  const handleOpenFormModal = () => {
    handleOpenModal()
    if (isEdit) {
      setIsEdit(!isEdit)
    }
  }

  const columns: ColumnsType<Subscription> = [
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
      render: (dataValue, record) => {
        const subscriptionPeriod: { value: number; label: string }[] =
          Object.assign(
            Subscription_Period.filter(
              (subscription) => subscription.value === record.period,
            ),
          )

        return <span>{subscriptionPeriod[0].label}</span>
      },
    },
    {
      title: 'Subscription Price',
      key: 'price',
      dataIndex: 'price',
      render: (dataValue, record) => {
        const formatRupiah = FormatToRupiah(record.price)

        return <span>{formatRupiah}</span>
      },
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
        textButton="Create New Subscription Plan"
        iconElement={<AiOutlinePlus />}
      />
      <ModalFormSubscription
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
        onOk={handleDeleteSubscription}
        isLoadingRemove={isLoadingRemove}
      />

      <AtomTable
        isLoading={isLoading}
        columns={columns}
        dataSource={ListSubscription}
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

export default SubscriptionLayout
