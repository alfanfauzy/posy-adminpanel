import React from 'react'
import MoleculesMetaHeader from '@/molecules/meta-header'
import GeneralLayout from '@/templates/layouts'
import ListRestaurantPages from '@/pages/user/listRestaurant'

const ListRestaurantPage = () => (
  <>
    <MoleculesMetaHeader
      title="List Admin - Admin Panel FnB"
      description="List Admin - Admin Panel FnB"
    />
    <GeneralLayout>
      <ListRestaurantPages />
    </GeneralLayout>
  </>
)

export default ListRestaurantPage
