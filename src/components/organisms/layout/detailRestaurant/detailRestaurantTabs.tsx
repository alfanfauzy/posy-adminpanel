import { Tabs } from 'posy-fnb-core'
import React, { useState } from 'react'

const Item = [
  { label: 'Outlet' },
  { label: 'Product' },
  { label: 'Subscription History' },
]

const OrganismDetailRestaurantTabs = () => {
  const [tabsVal, setTabsVal] = useState(0)

  return (
    <section className="mt-10">
      <Tabs items={Item} value={tabsVal} onChange={(e) => setTabsVal(e)} />
    </section>
  )
}

export default OrganismDetailRestaurantTabs
