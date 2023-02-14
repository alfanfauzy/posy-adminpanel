// eslint-disable-file no-use-before-define
import { ReactElement, ReactNode, Suspense, useEffect, useState } from 'react'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { useRouter } from 'next/router'
import 'posy-fnb-core/dist/index.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { dummy } from 'src/data'
import LoadingBar from '@/atoms/loadingBar'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const router = useRouter()
  const { asPath } = router

  const [state, setState] = useState({
    isRouteChanging: false,
    loadingKey: 0,
  })

  useEffect(() => {
    if (asPath === '/') {
      router.push('/auth/login')
    }
    localStorage.setItem('items', JSON.stringify(dummy))
  })

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setState((prevState) => ({
        ...prevState,
        isRouteChanging: true,
        // eslint-disable-next-line no-bitwise
        loadingKey: prevState.loadingKey ^ 1,
      }))
    }

    const handleRouteChangeEnd = () => {
      setState((prevState) => ({
        ...prevState,
        isRouteChanging: false,
      }))
    }

    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeEnd)
    router.events.on('routeChangeError', handleRouteChangeEnd)

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeEnd)
      router.events.off('routeChangeError', handleRouteChangeEnd)
    }
  }, [router.events])

  const getLayout =
    Component.getLayout ??
    ((page) => <Suspense fallback={<p>Loading . . . .</p>}>{page}</Suspense>)

  return getLayout(
    <>
      <LoadingBar
        isRouteChanging={state.isRouteChanging}
        key={state.loadingKey}
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
    </>,
  )
}

export default App
