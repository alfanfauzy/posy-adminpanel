import { Switch } from 'antd'
import React from 'react'

interface SwitchProps {
  label: string
  text?: string
  onChange: () => void
}

const AtomSwitch = ({ label, text, onChange }: SwitchProps) => (
  <div>
    {label && <label className="mb-1 block text-m-regular">{label}</label>}
    <span className="flex items-center justify-start gap-2">
      <Switch onChange={onChange} />
      {text && <label className="mb-1 block text-m-regular">{text}</label>}
    </span>
  </div>
)

export default AtomSwitch
