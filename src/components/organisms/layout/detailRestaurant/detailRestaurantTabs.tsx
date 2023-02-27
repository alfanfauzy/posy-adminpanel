import { Tabs } from 'posy-fnb-core'
import React, { useState } from 'react'
import ListProductMenuLayout from '@/pages/user/productMenu'
import ListCategoryMenuLayout from '@/pages/user/categoryMenu'
import ManageOutletLayout from '@/pages/user/manageOutlet'
import UserSubscriptionLayout from '@/pages/user/subscription'

const Item = [
  { label: 'Outlet' },
  { label: 'Category' },
  { label: 'Product' },
  { label: 'Subscription History' },
]

const OrganismDetailRestaurantTabs = () => {
  const [tabsVal, setTabsVal] = useState(0)

  return (
    <section className="mt-10">
      <Tabs items={Item} value={tabsVal} onChange={(e) => setTabsVal(e)} />

      {tabsVal === 0 && <ManageOutletLayout />}
      {tabsVal === 1 && <ListCategoryMenuLayout />}
      {tabsVal === 2 && <ListProductMenuLayout />}
      {tabsVal === 3 && <UserSubscriptionLayout />}
    </section>
  )
}

export default OrganismDetailRestaurantTabs
