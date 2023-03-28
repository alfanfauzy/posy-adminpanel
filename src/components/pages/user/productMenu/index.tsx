import React, { useState } from 'react'
import { Button } from 'posy-fnb-core'
import type { ColumnsType } from 'antd/es/table'
import { AiFillDelete, AiFillEdit, AiOutlinePlus } from 'react-icons/ai'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import { DataType } from './entities'
import { dummy } from 'src/data/restaurant'
import { timeStampConverter } from '@/constants/utils'
import AtomTable from '@/atoms/table'
import useToggle from '@/hooks/useToggle'
import HeaderContent from '@/templates/header/header-content'
import AtomSwitch from '@/atoms/switch'

const ModalFormProduct = dynamic(() => import('@/organisms/form/product'))
const ModalConfirmation = dynamic(
  () => import('@/molecules/modal/confirmation'),
)

const ListProductMenuLayout: React.FC = () => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const [selectedData, setSelectedData] = useState<DataType>({})
  const [isEdit, setIsEdit] = useState(false)

  const { value: openModal, toggle: handleOpenModal } = useToggle(false)
  const { value: openModalConfirmation, toggle: handleOpenModalConfirmation } =
    useToggle(false)
  const { value: switchActiveMenu, toggle: handleSwitchActiveMenu } =
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
      title: 'No',
      dataIndex: '',
      filterMode: 'tree',
      filterSearch: true,
      render: (value, item, index) => (page - 1) * 10 + index + 1,
    },
    {
      title: 'Product Name',
      key: 'product_name',
      dataIndex: 'product_name',
    },
    {
      title: 'Price',
      key: 'price',
      dataIndex: 'price',
    },
    {
      title: 'Discounted Price',
      key: 'price_after_discount',
      dataIndex: 'price_after_discount',
      sorter: (a: any, b: any) => a.created_at.seconds - b.created_at.seconds,
      render: (dataValue, record: any) =>
        timeStampConverter(record?.created_at?.seconds, 'DD-MM-YYYY HH:mm'),
    },
    {
      title: 'Cooking Duration',
      key: 'cooking_duration',
      dataIndex: 'cooking_duration',
    },
    {
      title: 'Active',
      key: 'is_active',
      dataIndex: 'is_active',
      render: () => (
        <AtomSwitch
          onChange={handleSwitchActiveMenu}
          name="is_active"
          value={switchActiveMenu}
        />
      ),
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
    <div className="pt-5">
      <HeaderContent
        onClick={handleOpenFormModal}
        textButton="Add Product"
        iconElement={<AiOutlinePlus />}
      />
      <ModalFormProduct
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

export default ListProductMenuLayout
