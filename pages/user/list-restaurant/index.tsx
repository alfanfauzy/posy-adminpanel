import React from 'react'
import MoleculesMetaHeader from '@/molecules/meta-header'
import GeneralLayout from '@/templates/layouts'
import useAuthentication from '@/hooks/useAuthentication'
import ListRestaurantLayout from '@/pages/user/listRestaurant'

const ListRestaurantPage = () => {
  // Handle Authentication
  useAuthentication()

  return (
    <>
      <MoleculesMetaHeader
        title="List Restaurant - Admin Panel FnB"
        description="List Restaurant - Admin Panel FnB"
      />
      <GeneralLayout menu="User" subMenu="List Restaurant">
        <ListRestaurantLayout />
      </GeneralLayout>
    </>
  )
}

export default ListRestaurantPage
