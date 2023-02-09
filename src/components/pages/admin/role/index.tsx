import React, { useState } from 'react'
import dynamic from 'next/dynamic'

const TabsComponent = dynamic(
  () => import('posy-fnb-core').then((el) => el.Tabs),
  {
    ssr: false,
  },
)

const RoleListLayout = dynamic(() => import('@/organisms/layout/role'))

const RolePermissionGeneral = () => {
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
      {tabsVal === 1 && <p>Permission</p>}
    </section>
  )
}

export default RolePermissionGeneral
