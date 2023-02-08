import { useQuery } from 'react-query'
import { Login } from 'services/login'

export const useLogin = () =>
  useQuery({
    queryKey: [],
    queryFn: () => Login(),
  })
