import React from 'react'
import MoleculesMetaHeader from '@/molecules/meta-header'
import GeneralLayout from '@/templates/layouts'
import SubscriotionPage from '@/pages/admin/subscription'

const SubscriptionPageLayout = () => (
  <>
    <MoleculesMetaHeader
      title="Subscription - Admin Panel FnB"
      description="Subscription - Admin Panel FnB"
    />
    <GeneralLayout menu="Admin" subMenu="Subscription">
      <SubscriotionPage />
    </GeneralLayout>
  </>
)

export default SubscriptionPageLayout
