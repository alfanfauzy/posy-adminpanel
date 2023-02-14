import { NextPageWithLayout } from '../../_app'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import MoleculesMetaHeader from '@/molecules/meta-header'
import AuthLayout from '@/templates/layouts/auth-layout'
import LoginPage from '@/pages/login'
import { useAppSelector } from 'store/hooks'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const { isLoggedIn } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/dashboard')
    } else {
      router.push('/auth/login')
    }
  }, [isLoggedIn])

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
