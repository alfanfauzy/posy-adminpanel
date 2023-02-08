import React from 'react'

import Select from 'react-select'

interface InputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error: boolean
  helperText?: any
  labelText: string
}

const SelectInput = React.forwardRef(
  (
    {
      labelText,
      error,
      helperText,
      value,
      onChange,
      onBlur,
      name,
      defaultValue,
      ...inputProps
    }: InputProps,
    ref: any,
  ) => (
    <>
      <Select
        {...inputProps}
        defaultValue={defaultValue}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        ref={ref}
        className="basic-single"
        classNamePrefix="select"
        isClearable
        options={[
          { value: 'jack', label: 'Jack' },
          { value: 'lucy', label: 'Lucy' },
          { value: 'Yiminghe', label: 'yiminghe' },
          { value: 'disabled', label: 'Disabled', disabled: true },
        ]}
      />
      {helperText && (
        <small
          className={`${
            error ? 'text-red-600' : 'text-neutral-100'
          } block text-m-regular mt-1`}
        >
          {helperText}
        </small>
      )}
    </>
  ),
)

SelectInput.displayName = 'SelectInput'

export default SelectInput
