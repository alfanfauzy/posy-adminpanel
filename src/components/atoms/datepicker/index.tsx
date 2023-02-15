import { DatePicker } from 'antd'
import React from 'react'

interface AtomDatePickerProps {
  type: 'single' | 'range'
  onChange: () => void
  value: any
}

const AtomDatePicker = ({ type, onChange, value }: AtomDatePickerProps) => {
  const { RangePicker } = DatePicker

  if (type === 'single') {
    return <DatePicker onChange={onChange} value={value} />
  }

  return <RangePicker onChange={onChange} value={value} />
}

export default AtomDatePicker
