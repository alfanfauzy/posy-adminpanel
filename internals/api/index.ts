/* eslint-disable no-param-reassign */
import {GroupingAccess} from '@/constants/utils';
import {DataLogin} from '@/domain/auth/models';
import {Response} from '@/domain/vo/BaseResponse';
import axios from 'axios';
import {toast} from 'react-toastify';
// eslint-disable-next-line import/no-cycle
import {store} from 'store/index';
import {authSuccess, onChangeToken} from 'store/slice/auth';

const axiosApiInstance = axios.create();

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
	(config: any) => {
		const {token} = store.getState().auth.authData;
		if (token) {
			config.headers['token'] = token;
		}

		return config;
	},
	error => {
		return Promise.reject(error);
	},
);

axiosApiInstance.interceptors.response.use(
	res => {
		return res;
	},
	async err => {
		const {config, response} = err;
		const originalRequest = config;
		const statusCode = response.status;

		// Access Token was expired
		if (statusCode === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			const dataStore = store.getState().auth.authData;

			try {
				const responseRefreshToken = await axios.post(
					'/api/fnb-user-service/refresh-token',
					{
						user_uuid: dataStore.user_info.user_uuid,
						token: dataStore.token,
						refresh_token: dataStore.refresh_token,
					},
				);

				if (responseRefreshToken.status === 200) {
					const newPayload = {
						...responseRefreshToken.data,
					};
					store.dispatch(onChangeToken(newPayload));
				}
			} catch (_error) {
				toast.error('Session time out. Please login again.');
				return Promise.reject(_error);
			}
		}

		return Promise.reject(err);
	},
);

export default axiosApiInstance;
