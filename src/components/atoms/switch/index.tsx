import { Switch } from 'antd'
import React from 'react'

interface SwitchProps {
  label: string
  text?: string
  onChange: () => void
  name: string
  value?: boolean
}

const AtomSwitch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, text, onChange, value, ...props }, ref) => (
    <div>
      {label && <label className="mb-1 block text-m-regular">{label}</label>}
      <span className="flex items-center justify-start gap-2">
        <Switch onChange={onChange} {...props} checked={value} ref={ref} />
        {text && <label className="mb-1 block text-m-regular">{text}</label>}
      </span>
    </div>
  ),
)

AtomSwitch.displayName = 'Switch'

export default AtomSwitch
