import React from 'react'
import useAuthentication from '@/hooks/useAuthentication'
import MoleculesMetaHeader from '@/molecules/meta-header'
import GeneralLayout from '@/templates/layouts'
import CategoryLayout from '@/pages/category'

const CategoryPage = () => (
  // Handle Authentication
  //   useAuthentication()

  <>
    <MoleculesMetaHeader
      title="Category Product Menu - Admin Panel FnB"
      description="Category Product Menu - Admin Panel FnB"
    />
    <GeneralLayout menu="-" subMenu="Category Product Menu">
      <CategoryLayout />
    </GeneralLayout>
  </>
)

export default CategoryPage
