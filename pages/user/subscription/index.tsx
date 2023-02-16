import React from 'react'
import MoleculesMetaHeader from '@/molecules/meta-header'
import GeneralLayout from '@/templates/layouts'
import UserSubscription from '@/pages/user/subscription'
import useAuthentication from '@/hooks/useAuthentication'

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
        <UserSubscription />
      </GeneralLayout>
    </>
  )
}

export default UserSubscriptionPage
