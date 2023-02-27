import { NextPageWithLayout } from '../../_app'
import React from 'react'
import MoleculesMetaHeader from '@/molecules/meta-header'
import AuthLayout from '@/templates/layouts/auth-layout'
import LoginPage from '@/pages/login'
import useAuthentication from '@/hooks/useAuthentication'

const Page: NextPageWithLayout = () => {
  // Handle Authentication
  useAuthentication()

  return (
    <>
      <MoleculesMetaHeader
        title="Admin Panel Fnb - Login"
        description="Admin Panel FnB"
      />
      <LoginPage />
    </>
  )
}

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>
export default Page
