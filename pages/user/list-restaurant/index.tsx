import React from 'react'
import MoleculesMetaHeader from '@/molecules/meta-header'
import GeneralLayout from '@/templates/layouts'
import ListRestaurantPages from '@/pages/user/listRestaurant'

const ListRestaurantPage = () => (
  <>
    <MoleculesMetaHeader
      title="List Restaurant - Admin Panel FnB"
      description="List Restaurant - Admin Panel FnB"
    />
    <GeneralLayout menu="User" subMenu="List Restaurant">
      <ListRestaurantPages />
    </GeneralLayout>
  </>
)

export default ListRestaurantPage
