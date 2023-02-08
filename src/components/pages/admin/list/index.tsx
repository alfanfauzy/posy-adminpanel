import React, { createRef, useEffect, useRef, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import dynamic from 'next/dynamic'
import { Button } from 'posy-fnb-core'
import { AiFillDelete, AiFillEdit, AiOutlineSearch } from 'react-icons/ai'
import { Input } from 'antd'
import { toast } from 'react-toastify'
import type { FilterConfirmProps } from 'antd/es/table/interface'
import { DataType } from './entities'
import FilterInput from '@/atoms/table/filter/input'
import AtomTable from '@/atoms/table'
import HeaderContent from '@/templates/header/header-content'
import useToggle from '@/hooks/useToggle'
import { timeStampConverter } from '@/constants/utils'
import ModalConfirmation from '@/molecules/modal/confirmation'
import AtomTag from '@/atoms/tag'

const ModalFormAdmin = dynamic(() => import('@/organisms/form/admin'))

const AdminListPage = () => {
  const [selectedData, setSelectedData] = useState<DataType>({})
  const [dataAdmin, setDataAdmin] = useState([])
  const [isEdit, setIsEdit] = useState(false)

  const { value: openModal, toggle: handleOpenModal } = useToggle(false)
  const { value: openModalConfirmation, toggle: handleOpenModalConfirmation } =
    useToggle(false)

  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const getData = JSON.parse(localStorage.getItem('items'))
      setDataAdmin(getData)
    }
  }, [])

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
    toast.success('Sucessfully remove data')
  }

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
  ) => {
    confirm()
    setSearchText(selectedKeys[0])
  }

  const handleReset = (clearFilters) => {
    clearFilters()
    setSearchText('')
  }

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div className="custom-filter-dropdown">
        <Input
          ref={(node) => {
            console.log(node)
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => <AiOutlineSearch />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        // setTimeout(() => searchInput.select())
      }
    },
  })

  const columns: ColumnsType = [
    {
      title: '#',
      dataIndex: '',
      filterMode: 'tree',
      filterSearch: true,
      render: (dataValue, record, id) => id + 1,
    },
    {
      title: 'Email',
      dataIndex: 'username',
      ...getColumnSearchProps('username'),
    },
    {
      title: 'Full Name',
      dataIndex: 'fullname',
    },
    {
      title: 'Role',
      render: (dataValue, record, index) => (
        <AtomTag status={record?.role[0]?.name} />
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'address',
      render: (dataValue, record, index) =>
        timeStampConverter(record?.created_at?.seconds, 'yyyy-mm-DD HH:mm'),
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

  const onChange: TableProps<DataType>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra,
  ) => {
    console.log('params', pagination, filters, sorter, extra)
  }

  return (
    <div>
      <HeaderContent onClick={handleOpenFormModal} />
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
      <AtomTable columns={columns} dataSource={dataAdmin} onChange />
    </div>
  )
}

export default AdminListPage
