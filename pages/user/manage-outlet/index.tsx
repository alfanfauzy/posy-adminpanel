import React from 'react'
import MoleculesMetaHeader from '@/molecules/meta-header'
import GeneralLayout from '@/templates/layouts'
import ListUserRestaurantPages from '@/pages/user/listUserRestaurant'

const ManageOutletPage = () => (
  <>
    <MoleculesMetaHeader
      title="Manage Outlet - Admin Panel FnB"
      description="Manage Outlet - Admin Panel FnB"
    />
    <GeneralLayout menu="User" subMenu="Manage Outlet">
      <ListUserRestaurantPages />
    </GeneralLayout>
  </>
)

export default ManageOutletPage
