// eslint-disable-file no-use-before-define
import { ReactElement, ReactNode, Suspense, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import 'react-tabs/style/react-tabs.css'
import { useRouter } from 'next/router'
import 'posy-fnb-core/dist/index.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from 'src/store'
import { dummy } from 'src/data'
import LoadingBar from '@/atoms/loading/loadingBar'
import { useLoading } from '@/hooks/useLoading'
import { Loading } from '@/atoms/loading'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const router = useRouter()
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    },
  })
  const { asPath } = router

  const { loadingState } = useLoading()

  useEffect(() => {
    if (asPath === '/') {
      router.push('/auth/login')
    }
    localStorage.setItem('items', JSON.stringify(dummy))
  })

  const getLayout =
    Component.getLayout ??
    ((page) => <Suspense fallback={<Loading size={100} />}>{page}</Suspense>)

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <LoadingBar
            isRouteChanging={loadingState.isRouteChanging}
            key={loadingState.loadingKey}
          />
          <Component {...pageProps} />
          <ToastContainer
            position="top-center"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </PersistGate>
      </Provider>
    </QueryClientProvider>,
  )
}

export default App
