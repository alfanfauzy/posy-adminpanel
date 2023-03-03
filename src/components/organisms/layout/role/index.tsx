import React, { useMemo, useState } from 'react'
import { Button } from 'posy-fnb-core'
import type { ColumnsType } from 'antd/es/table'
import { AiFillDelete, AiFillEdit, AiOutlinePlus } from 'react-icons/ai'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import { DataType } from './entities'
import { findIndexArraySearch, timeStampConverter } from '@/constants/utils'
import AtomTable from '@/atoms/table'
import useToggle from '@/hooks/useToggle'
import HeaderContent from '@/templates/header/header-content'
import { useQueryGetRoles } from '@/hooks/query/useRole'
import { RoleListData } from 'types/role'
import FilterTable from '@/atoms/table/filter/input'
import { ParamsObject } from 'shared/baseResponse'

const ModalFormRole = dynamic(() => import('@/organisms/form/role'))
const ModalConfirmation = dynamic(
  () => import('@/molecules/modal/confirmation'),
)

const RoleLayout: React.FC = () => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [searchParams, setSearchParams] = useState([])
  const [valueSearch, setValueSearch] = useState('')

  const hooksParams = useMemo(
    () => ({
      search: searchParams,
      sort: { field: 'created_at', value: 'desc' },
      page,
      limit,
    }),
    [page, limit, searchParams],
  )

  const [selectedData, setSelectedData] = useState<DataType>({})
  const [isEdit, setIsEdit] = useState(false)

  const { value: openModal, toggle: handleOpenModal } = useToggle(false)
  const { value: openModalConfirmation, toggle: handleOpenModalConfirmation } =
    useToggle(false)

  const {
    data: RoleList,
    isLoading,
    refetch: handleRefetchTable,
  } = useQueryGetRoles({ queryKey: 'role/get', params: hooksParams })

  /** Modal Confirmation Action */

  const handleShowConfirmationModal = (data: DataType) => {
    handleOpenModalConfirmation()
    setSelectedData(data)
  }

  const handleCloseModalConfirmation = () => {
    handleOpenModalConfirmation()
    setSelectedData({})
  }

  const handleSearchParam = (
    field: string,
    value: string,
    close: () => void,
  ) => {
    const filter: ParamsObject[] = [...searchParams]

    const newObject = {
      field,
      value,
    }

    const getIndex = findIndexArraySearch(searchParams, field)

    if (getIndex === -1) {
      setSearchParams([...filter, newObject])
    }

    if (getIndex !== -1) {
      filter[getIndex].value = value
      setSearchParams([...filter])
    }

    close()
  }

  const handleResetField = (field: string, close: () => void) => {
    const getIndex = findIndexArraySearch(searchParams, field)
    const tempSearchParam = [...searchParams]

    if (getIndex !== -1) {
      tempSearchParam.splice(getIndex, 1)
    }

    close()
    setValueSearch('')
    setSearchParams([...tempSearchParam])
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

  const handleDeleteRole = () => {
    const { uuid } = selectedData
    /**
     * Todo Remove
     */

    handleCloseModalConfirmation()
    toast.success(`Sucessfully remove data ${uuid}`)
  }

  const columns: ColumnsType<RoleListData> = [
    {
      title: '#',
      dataIndex: '',
      filterMode: 'tree',
      filterSearch: true,
      render: (datavalue, record, index) => (page - 1) * 10 + index + 1,
    },
    {
      title: 'Role Name',
      key: 'name',
      dataIndex: 'name',
      ...FilterTable(
        'name',
        handleSearchParam,
        valueSearch,
        setValueSearch,
        handleResetField,
      ),
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
        timeStampConverter(
          record.metadata.created_at.seconds,
          'DD-MM-YYYY HH:mm',
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
    <main className="mt-4">
      <HeaderContent
        onClick={handleOpenFormModal}
        textButton="Create Role"
        iconElement={<AiOutlinePlus />}
      />
      <ModalFormRole
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
        onOk={handleDeleteRole}
      />
      <AtomTable
        isLoading={isLoading}
        columns={columns}
        dataSource={RoleList?.objs}
        onChangePaginationItem={(e: { value: number }) => {
          setLimit(e.value)
          setPage(1)
        }}
        limitSize={limit}
        pagination={{
          current: page,
          pageSize: limit,
          total: RoleList?.total_objs,
          onChange: setPage,
        }}
      />
    </main>
  )
}

export default RoleLayout
