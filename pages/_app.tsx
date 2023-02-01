// eslint-disable-file no-use-before-define
import { ReactElement, ReactNode, Suspense } from 'react'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import '../styles/globals.css'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <Suspense fallback={<h1>Loading profile...</h1>}>{page}</Suspense>
    ))
  return getLayout(<Component {...pageProps} />)
}

export default App
