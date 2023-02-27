import React from 'react'
import useAuthentication from '@/hooks/useAuthentication'
import MoleculesMetaHeader from '@/molecules/meta-header'
import GeneralLayout from '@/templates/layouts'
import OrganismFormProduct from '@/organisms/form/product'

const ProductPage = () => {
  // Handle Authentication
  useAuthentication()

  return (
    <>
      <MoleculesMetaHeader
        title="Product Menu - Admin Panel FnB"
        description="Product Menu - Admin Panel FnB"
      />
      <GeneralLayout menu="-" subMenu="Product Menu">
        <OrganismFormProduct />
      </GeneralLayout>
    </>
  )
}

export default ProductPage
