/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-unstable-nested-components */

// /* eslint-disable react/no-unstable-nested-components */
// import React, { createRef, useEffect, useRef, useState } from 'react'
// import dynamic from 'next/dynamic'
// import { Button } from 'posy-fnb-core'
// import { AiFillDelete, AiFillEdit, AiOutlineSearch } from 'react-icons/ai'
// import { Input } from 'antd'
// import { toast } from 'react-toastify'
// import type { FilterConfirmProps } from 'antd/es/table/interface'
// import type { ColumnsType, ColumnType } from 'antd/es/table'
// import type { InputRef } from 'antd'
// import { DataType } from './entities'
// import FilterInput from '@/atoms/table/filter/input'
// import AtomTable from '@/atoms/table'
// import HeaderContent from '@/templates/header/header-content'
// import useToggle from '@/hooks/useToggle'
// import { timeStampConverter } from '@/constants/utils'
// import ModalConfirmation from '@/molecules/modal/confirmation'
// import AtomTag from '@/atoms/tag'

// const ModalFormAdmin = dynamic(() => import('@/organisms/form/admin'))

// const AdminListPage = () => {
//   const [selectedData, setSelectedData] = useState<DataType>({})
//   const [dataAdmin, setDataAdmin] = useState([])
//   const [isEdit, setIsEdit] = useState(false)

//   const { value: openModal, toggle: handleOpenModal } = useToggle(false)
//   const { value: openModalConfirmation, toggle: handleOpenModalConfirmation } =
//     useToggle(false)

//   const [searchText, setSearchText] = useState('')
//   const [searchedColumn, setSearchedColumn] = useState('')
//   const searchInput = useRef<InputRef>(null)

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const getData = JSON.parse(localStorage.getItem('items'))
//       setDataAdmin(getData)
//     }
//   }, [])

//   /** Modal Confirmation Action */

//   const handleShowConfirmationModal = (data: DataType) => {
//     handleOpenModalConfirmation()
//     setSelectedData(data)
//   }

//   const handleCloseModalConfirmation = () => {
//     handleOpenModalConfirmation()
//     setSelectedData({})
//   }

//   /** ------------------------- */

//   /** Modal Add/Edit Action */

//   const handleOpenFormModal = () => {
//     handleOpenModal()
//     if (isEdit) {
//       setIsEdit(!isEdit)
//     }
//   }

//   /** ------------------------- */

//   const handleDeleteAdmin = () => {
//     const { uuid } = selectedData
//     /**
//      * Todo Remove
//      */

//     handleCloseModalConfirmation()
//     toast.success('Sucessfully remove data')
//   }
//   type DataIndex = keyof DataType

//   const handleSearch = (
//     selectedKeys: string[],
//     confirm: () => void,
//     dataIndex: DataIndex,
//   ) => {
//     console.log(confirm)
//     confirm()
//     setSearchText(selectedKeys[0])
//     setSearchedColumn(dataIndex)
//   }

//   const handleReset = (clearFilters: () => void) => {
//     clearFilters()
//     setSearchText('')
//   }

//   console.log(searchText, searchInput)
//   const getColumnSearchProps = (
//     dataIndex: DataIndex,
//   ): ColumnType<DataType> => ({
//     filterDropdown: ({
//       setSelectedKeys,
//       selectedKeys,
//       confirm,
//       clearFilters,
//     }) => (
//       <div className="custom-filter-dropdown">
//         <Input
//           ref={searchInput}
//           placeholder={`Search ${dataIndex}`}
//           value={selectedKeys[0]}
//           onChange={(e) =>
//             setSelectedKeys(e.target.value ? [e.target.value] : [])
//           }
//           onPressEnter={() =>
//             handleSearch(selectedKeys as string[], confirm, dataIndex)
//           }
//           style={{ width: 188, marginBottom: 8, display: 'block' }}
//         />
//         <Button
//           variant="primary"
//           onClick={() =>
//             handleSearch(selectedKeys as string[], confirm, dataIndex)
//           }
//           // icon="search"
//           size="xs"
//           style={{ width: 90, marginRight: 8 }}
//         >
//           Search
//         </Button>
//         <Button
//           onClick={() => clearFilters && handleReset(clearFilters)}
//           size="xs"
//           style={{ width: 90 }}
//         >
//           Reset
//         </Button>
//       </div>
//     ),
//     filterIcon: (filtered) => <AiOutlineSearch />,
//     onFilter: (value, record) =>
//       record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
//     onFilterDropdownVisibleChange: (visible) => {
//       if (visible) {
//         // setTimeout(() => searchInput.select())
//       }
//     },
//   })

//   const columns: ColumnsType = [
//     {
//       title: '#',
//       dataIndex: '',
//       filterMode: 'tree',
//       filterSearch: true,
//       render: (dataValue, record, id) => id + 1,
//     },
//     {
//       title: 'Email',
//       dataIndex: 'username',
//       ...getColumnSearchProps('username'),
//     },
//     {
//       title: 'Full Name',
//       dataIndex: 'fullname',
//     },
//     {
//       title: 'Role',
//       render: (dataValue, record, index) => (
//         <AtomTag status={record?.role[0]?.name} />
//       ),
//     },
//     {
//       title: 'Created At',
//       dataIndex: 'address',
//       render: (dataValue, record, index) =>
//         timeStampConverter(record?.created_at?.seconds, 'yyyy-mm-DD HH:mm'),
//     },
//     {
//       title: 'Action',
//       render: (dataValue, record, index) => (
//         <span className="flex gap-1">
//           <Button
//             variant="secondary"
//             onClick={() => {
//               handleOpenFormModal()
//               setIsEdit(true)
//               setSelectedData(dataValue)
//             }}
//           >
//             <AiFillEdit />
//           </Button>
//           <Button
//             variant="red-accent"
//             onClick={() => handleShowConfirmationModal(dataValue)}
//           >
//             <AiFillDelete />
//           </Button>
//         </span>
//       ),
//     },
//   ]

//   const onChange: TableProps<DataType>['onChange'] = (
//     pagination,
//     filters,
//     sorter,
//     extra,
//   ) => {
//     console.log('params', pagination, filters, sorter, extra)
//   }

//   return (
//     <div>
//       <HeaderContent onClick={handleOpenFormModal} />
//       <ModalFormAdmin
//         isOpenModal={openModal}
//         handleClose={handleOpenFormModal}
//         isEdit={isEdit}
//         selectedData={selectedData}
//       />
//       <ModalConfirmation
//         isOpenModal={openModalConfirmation}
//         title="Modal Confirmation"
//         text="Are you sure want to remove ?"
//         onClose={handleCloseModalConfirmation}
//         onOk={handleDeleteAdmin}
//       />
//       <AtomTable columns={columns} dataSource={dataAdmin} onChange />
//     </div>
//   )
// }

// export default AdminListPage

import React, { useRef, useState } from 'react'
import type { InputRef } from 'antd'
import { Button, Input, Space, Table } from 'antd'
import type { ColumnsType, ColumnType } from 'antd/es/table'
import type { FilterConfirmProps } from 'antd/es/table/interface'
import { MdSearch } from 'react-icons/md'
import Highlighter from 'react-highlight-words'
import { dummy } from 'src/data'
import { timeStampConverter } from '@/constants/utils'
import AtomTag from '@/atoms/tag'

interface DataType {
  uuid: string
  username: string
  fullname: string
  created_at: {
    seconds: number
    nanos: number
  }
  updated_at: {
    seconds: number
    nanos: number
  }
  deleted_at: {
    seconds: number
  }
  last_login: {
    seconds: number
  }
  role: {
    uuid: string
    name: string
    is_admin: boolean
  }[]
}

type DataIndex = keyof DataType

const App: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef<InputRef>(null)

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

  const getColumnSearchProps = (
    dataIndex: DataIndex,
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        role="presentation"
        style={{ padding: 8 }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            // type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            // icon={<Md11Mp />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false })
              setSearchText((selectedKeys as string[])[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close()
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <MdSearch style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  })

  const columns: ColumnsType<DataType> = [
    {
      title: '#',
      dataIndex: '',
      filterMode: 'tree',
      filterSearch: true,
      render: (dataValue, record, id) => id + 1,
    },
    {
      title: 'Username',
      key: 'username',
      dataIndex: 'username',
      ...getColumnSearchProps('username'),
    },
    {
      title: 'Full Name',
      key: 'fullname',
      dataIndex: 'fullname',
      ...getColumnSearchProps('fullname'),
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
      sorter: (a, b) => a.created_at.seconds - b.created_at.seconds,
      render: (dataValue, record: any) =>
        timeStampConverter(record?.created_at?.seconds, 'DD-MM-YYYY HH:mm'),
    },
    {
      title: 'Action',
      render: () => (
        <span className="flex gap-1">
          {/* <Button
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
          </Button> */}
        </span>
      ),
    },
  ]

  return <Table columns={columns} dataSource={dummy} />
}

export default App
