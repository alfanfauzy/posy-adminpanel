// eslint-disable-file no-use-before-define
import { ReactElement, ReactNode, Suspense, useEffect } from 'react'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { useRouter } from 'next/router'
import 'posy-fnb-core/dist/index.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { dummy } from 'src/data'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const router = useRouter()
  const { asPath } = router

  useEffect(() => {
    if (asPath === '/') {
      router.push('/auth/login')
    }
    localStorage.setItem('items', JSON.stringify(dummy))
  })

  const getLayout =
    Component.getLayout ??
    ((page) => <Suspense fallback={<p>Loading . . . .</p>}>{page}</Suspense>)

  return getLayout(
    <>
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
