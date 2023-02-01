import { Card } from 'antd'
import React from 'react'
import { CardProps } from './entities'

const AtomDefaultCard = (props: CardProps) => {
  const { children, title, bordered, className } = props

  return (
    <Card title={title} bordered={bordered} className={className}>
      {children}
    </Card>
  )
}

export default AtomDefaultCard
