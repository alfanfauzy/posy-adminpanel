import React from 'react'
import MoleculesMetaHeader from '@/molecules/meta-header'
import GeneralLayout from '@/templates/layouts'
import RestaurantDetailLayout from '@/pages/user/detailRestaurant/'
import useAuthentication from '@/hooks/useAuthentication'

const RestaurantDetailPage = () => {
  useAuthentication()

  return (
    <>
      <MoleculesMetaHeader
        title="Detail Restaurant - Admin Panel FnB"
        description="Detail Restaurant - Admin Panel FnB"
      />
      <GeneralLayout menu="User" subMenu="Detail Restaurant">
        <RestaurantDetailLayout />
      </GeneralLayout>
    </>
  )
}

export default RestaurantDetailPage
