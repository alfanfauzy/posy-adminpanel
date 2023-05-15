import {Loading} from '@/atoms/loading';
import LoadingBar from '@/atoms/loading/loadingBar';
import {queryClient} from '@/hooks/react-query';
import {useLoading} from '@/hooks/useLoading';
import {NextPage} from 'next';
import type {AppProps} from 'next/app';
import {useRouter} from 'next/router';
import {ReactElement, ReactNode, Suspense, useEffect, useState} from 'react';
import {QueryClientProvider} from 'react-query';
import 'styles/globals.css';
import 'react-tabs/style/react-tabs.css';
import 'posy-fnb-core/dist/index.css';
import 'react-toastify/dist/ReactToastify.css';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from 'src/store';

export type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

const App = ({Component, pageProps}: AppPropsWithLayout) => {
	const {authData, isLoggedIn} = store.getState().auth;

	const router = useRouter();
	const {asPath} = router;
	const {loadingState} = useLoading();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (asPath === '/' || asPath === '/auth/login') {
			if (isLoggedIn && authData) {
				router.push('/dashboard');
				setTimeout(() => {
					setLoading(false);
				}, 500);
				return;
			}

			router.push('/auth/login');
			setTimeout(() => {
				setLoading(false);
			}, 500);
			return;
		} else {
			if (isLoggedIn && authData) {
				router.push(asPath);
				setTimeout(() => {
					setLoading(false);
				}, 500);
				return;
			}

			router.push('/auth/login');
			setTimeout(() => {
				setLoading(false);
			}, 500);
			return;
		}
	}, [asPath]);

	const getLayout =
		Component.getLayout ??
		(page => <Suspense fallback={<Loading size={100} />}>{page}</Suspense>);

	return getLayout(
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					{loading ? (
						<Loading size={50} />
					) : (
						<>
							<LoadingBar
								isRouteChanging={loadingState.isRouteChanging}
								key={loadingState.loadingKey}
							/>
							<Component {...pageProps} />
						</>
					)}
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
	);
};

export default App;
