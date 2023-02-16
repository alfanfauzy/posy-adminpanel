import React from 'react'
import MoleculesMetaHeader from '@/molecules/meta-header'
import GeneralLayout from '@/templates/layouts'
import useAuthentication from '@/hooks/useAuthentication'
import ListUserRestaurantLayout from '@/pages/user/listUserRestaurant'

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
        <ListUserRestaurantLayout />
      </GeneralLayout>
    </>
  )
}

export default ListUserRestaurantPage
