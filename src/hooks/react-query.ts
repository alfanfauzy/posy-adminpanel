import {AxiosError} from 'axios';
import {QueryClient} from 'react-query';

const ERROR_CODE = [400, 401, 404, 500];

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry(failureCount, error) {
				const err = error as AxiosError;
				if (ERROR_CODE.includes(Number(err.code))) {
					return failureCount < 3;
				}
				return false;
			},
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
		},
	},
});
