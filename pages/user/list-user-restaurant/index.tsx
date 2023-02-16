import React from 'react'
import MoleculesMetaHeader from '@/molecules/meta-header'
import GeneralLayout from '@/templates/layouts'
import ListUserRestaurantPages from '@/pages/user/listUserRestaurant'
import useAuthentication from '@/hooks/useAuthentication'

const ListUserRestaurantPage = () => {
  // Handle Authentication
  useAuthentication()

  return (
    <>
      <MoleculesMetaHeader
        title="List User Restaurant - Admin Panel FnB"
        description="List User Restaurant - Admin Panel FnB"
      />
      <GeneralLayout menu="User" subMenu="List User Restaurant">
        <ListUserRestaurantPages />
      </GeneralLayout>
    </>
  )
}

export default ListUserRestaurantPage
