import {AxiosError} from 'axios';
import {QueryClient} from 'react-query';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry(failureCount, error) {
				const err = error as AxiosError;
				if (Number(err?.code) === 500) {
					return failureCount < 3;
				}
				return false;
			},
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
		},
	},
});
