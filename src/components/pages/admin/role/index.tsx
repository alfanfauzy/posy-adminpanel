import React, { useState } from 'react'
import dynamic from 'next/dynamic'

const TabsComponent = dynamic(
  () => import('posy-fnb-core').then((el) => el.Tabs),
  {
    ssr: false,
  },
)

const RoleListLayout = dynamic(() => import('@/organisms/layout/role'))
const PermissionLayout = dynamic(() => import('@/organisms/layout/permission'))

const RolePermissionLayout = () => {
  const Item = [{ label: 'Role' }, { label: 'Permission' }]

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

      {tabsVal === 0 && <RoleListLayout />}
      {tabsVal === 1 && <PermissionLayout />}
    </section>
  )
}

export default RolePermissionLayout
