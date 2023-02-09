import React, { useState } from 'react'
import { Tabs } from 'posy-fnb-core'
import dynamic from 'next/dynamic'

const TabsComponent = dynamic(
  () => import('posy-fnb-core').then((el) => el.Tabs),
  {
    ssr: false,
  },
)

const RolePermissionGeneral = () => {
  const Item = [{ label: 'Role' }, { label: 'Permission' }]

  const [tabsVal, setTabsVal] = useState(0)

  console.log(tabsVal)

  return (
    <section>
      <div>
        <TabsComponent
          items={Item}
          value={tabsVal}
          onChange={(e) => setTabsVal(e)}
        />
      </div>

      {tabsVal === 0 && <p>Role</p>}
      {tabsVal === 1 && <p>Permission</p>}
    </section>
  )
}

export default RolePermissionGeneral
