import React from 'react'
import MoleculesMetaHeader from '@/molecules/meta-header'
import GeneralLayout from '@/templates/layouts'
import ListUserRestaurantPages from '@/pages/user/listUserRestaurant'

const ListUserRestaurantPage = () => (
  <>
    <MoleculesMetaHeader
      title="List User Restaurant - Admin Panel FnB"
      description="List User Restaurant - Admin Panel FnB"
    />
    <GeneralLayout>
      <ListUserRestaurantPages />
    </GeneralLayout>
  </>
)

export default ListUserRestaurantPage
