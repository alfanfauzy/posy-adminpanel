import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAppSelector } from 'store/hooks'

const useAuthentication = () => {
  const router = useRouter()
  const { isLoggedIn } = useAppSelector((state) => state.auth)

  useEffect(() => {
    console.log(isLoggedIn)
    if (!isLoggedIn) {
      router.push('/auth/login')
    }
  }, [])
}

export default useAuthentication
