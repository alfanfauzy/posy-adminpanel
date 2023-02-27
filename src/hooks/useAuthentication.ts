import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAppSelector } from 'store/hooks'

const useAuthentication = () => {
  const router = useRouter()
  const isLoggedIn = useAppSelector((state) => state.isLoggedIn)

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/auth/login')
    }
  }, [isLoggedIn])
}

export default useAuthentication
