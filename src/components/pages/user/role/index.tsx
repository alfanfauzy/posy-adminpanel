import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import AccessSettingLayout from '@/organisms/layout/access'

const TabsComponent = dynamic(
  () => import('posy-fnb-core').then((el) => el.Tabs),
  {
    ssr: false,
  },
)

const RoleListLayout = dynamic(() => import('@/organisms/layout/role'))
const PermissionLayout = dynamic(() => import('@/organisms/layout/permission'))

const RolePermissionLayout = () => {
  const Item = [
    { label: 'Access Setting' },
    { label: 'Role' },
    { label: 'Permission' },
  ]

  const [tabsVal, setTabsVal] = useState(0)

  return (
    <section>
      <div>
        <TabsComponent
          items={Item}
          value={tabsVal}
          onChange={(e) => setTabsVal(e)}
        />
      </div>

      {tabsVal === 0 && <AccessSettingLayout type="client" />}
      {tabsVal === 1 && <RoleListLayout type="client" />}
      {tabsVal === 2 && <PermissionLayout type="client" />}
    </section>
  )
}

export default RolePermissionLayout
