import React from 'react'
import useAuthentication from '@/hooks/useAuthentication'
import MoleculesMetaHeader from '@/molecules/meta-header'
import GeneralLayout from '@/templates/layouts'

const ProductPage = () => (
  // Handle Authentication
  //   useAuthentication()

  <>
    <MoleculesMetaHeader
      title="Product Menu - Admin Panel FnB"
      description="Product Menu - Admin Panel FnB"
    />
    <GeneralLayout menu="-" subMenu="Product Menu">
      {/* <UserSubscriptionLayout /> */}
    </GeneralLayout>
  </>
)

export default ProductPage
