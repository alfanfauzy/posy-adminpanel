import React from 'react'
import MoleculesMetaHeader from '@/molecules/meta-header'
import GeneralLayout from '@/templates/layouts'
import useAuthentication from '@/hooks/useAuthentication'
import UserSubscriptionLayout from '@/pages/user/subscription'

const UserSubscriptionPage = () => {
  // Handle Authentication
  useAuthentication()

  return (
    <>
      <MoleculesMetaHeader
        title="User Subscription - Admin Panel FnB"
        description="User Subscription - Admin Panel FnB"
      />
      <GeneralLayout menu="User" subMenu="User Subscription">
        <UserSubscriptionLayout />
      </GeneralLayout>
    </>
  )
}

export default UserSubscriptionPage
