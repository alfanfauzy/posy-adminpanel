import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAppSelector } from 'store/hooks'

const useAuthentication = () => {
  const router = useRouter()
  const { isLoggedIn, authData } = useAppSelector((state) => state)

  useEffect(() => {
    if (!isLoggedIn && authData.token === '') {
      router.push('/auth/login')
    }
  }, [isLoggedIn])
}

export default useAuthentication
