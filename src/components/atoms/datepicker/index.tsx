import { DatePicker } from 'antd'
import React from 'react'

interface AtomDatePickerProps {
  type: 'single' | 'range'
  onChange: () => void
  value: any
  label?: string
  className: string
  placeholder: string
  format: string
}

interface RenderComponentProps {
  type: 'single' | 'range'
  onChange: () => void
  value: any
  className: string
  placeholder: string
  format: string
}

const RenderComponent = ({
  type,
  onChange,
  value,
  className,
  placeholder,
  format,
}: RenderComponentProps) => {
  const { RangePicker } = DatePicker
  if (type === 'single') {
    return (
      <DatePicker
        onChange={onChange}
        value={value}
        className={className}
        placeholder={placeholder}
        placement="bottomLeft"
        format={format}
      />
    )
  }
  return (
    <RangePicker
      onChange={onChange}
      value={value}
      className={className}
      placement="bottomLeft"
      format={format}
    />
  )
}

const AtomDatePicker = ({
  type,
  onChange,
  value,
  label,
  className,
  placeholder,
  format,
  ...props
}: AtomDatePickerProps) => (
  <div>
    {label && <label className="mb-1 block text-m-regular">{label}</label>}

    <RenderComponent
      type={type}
      onChange={onChange}
      value={value}
      className={className}
      placeholder={placeholder}
      format={format}
      {...props}
    />
  </div>
)

export default AtomDatePicker
