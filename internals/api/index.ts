/* eslint-disable no-param-reassign */
import {DataLogin} from '@/domain/auth/models';
import {Response} from '@/domain/vo/BaseResponse';
import axios, {AxiosResponse} from 'axios';
import {toast} from 'react-toastify';
// eslint-disable-next-line import/no-cycle
import {HandleRefreshTokenLogin} from 'services/login';
import {store} from 'store/index';
import {authSuccess} from 'store/slice/auth';

let isRefreshing = false;
const pendingRequest: Array<any> = [];

function onTokenRefreshed(token: string) {
	pendingRequest.filter((cb: any) => cb(token));
}

function addPendingRequest(callback: (token: string) => void) {
	pendingRequest.push(callback);
}

const axiosApiInstance = axios.create();
// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
	async (config: any) => {
		const {token} = store.getState().auth.authData;
		if (token) {
			config.headers = {
				token,
			};
		}

		return config;
	},
	error => {
		return Promise.reject(error);
	},
);

// Create a new Axios instance with a response interceptor
const axiosRefreshInstance = axios.create();
axiosRefreshInstance.interceptors.response.use(
	response => {
		return response;
	},
	async error => {
		const {config, response} = error;
		const originalRequest = config;
		const statusCode = response.status;

		if (statusCode === 401 && !originalRequest._retry) {
			if (isRefreshing) {
				// If the refresh token is already being refreshed, add the request to a refresh queue
				return new Promise(function (resolve) {
					addPendingRequest(function (token: string) {
						originalRequest.headers = {token};
						resolve(axiosApiInstance(originalRequest));
					});
				});
			}

			isRefreshing = true;

			// Use the refresh token to request a new access token
			return new Promise((resolve, reject) => {
				const dataStore = store.getState().auth.authData;

				const payload = {
					user_uuid: dataStore.user_info.user_uuid,
					token: dataStore.token,
					refresh_token: dataStore.refresh_token,
				};

				axiosRefreshInstance
					.post('/api/fnb-user-service/refresh-token', {
						payload,
					})
					.then((responseRefreshToken: AxiosResponse<Response<DataLogin>>) => {
						if (
							responseRefreshToken.data.code === 0 &&
							responseRefreshToken.data.message === 'OK'
						) {
							isRefreshing = false;

							store.dispatch(authSuccess(responseRefreshToken.data.data));

							onTokenRefreshed(responseRefreshToken.data.data.token);
							resolve(axiosApiInstance(originalRequest));
						}
					})
					.catch(errorRefreshToken => {
						reject(errorRefreshToken);
					})
					.finally(() => {
						isRefreshing = false;
					});
			});
		}
		return Promise.reject(error);
	},
);

export default axiosApiInstance;
