import React from 'react'
import { Table } from 'antd'

interface AtomTableProps {
  columns: any
  dataSource: any
  onChange: any
}

const AtomTable = ({ columns, dataSource, onChange }: AtomTableProps) => (
  <Table columns={columns} dataSource={dataSource} onChange={onChange} />
)

export default AtomTable
