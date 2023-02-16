import React from 'react'
import MoleculesMetaHeader from '@/molecules/meta-header'
import GeneralLayout from '@/templates/layouts'
import SubscriptionLayout from '@/pages/admin/subscription'
import useAuthentication from '@/hooks/useAuthentication'

const SubscriptionPage = () => {
  // Handle Authentication
  useAuthentication()

  return (
    <>
      <MoleculesMetaHeader
        title="Subscription - Admin Panel FnB"
        description="Subscription - Admin Panel FnB"
      />
      <GeneralLayout menu="Admin" subMenu="Subscription">
        <SubscriptionLayout />
      </GeneralLayout>
    </>
  )
}

export default SubscriptionPage
