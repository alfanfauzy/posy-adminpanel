import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {useAppSelector} from 'store/hooks';

const useAuthentication = () => {
	const router = useRouter();

	const {isLoggedIn, authData} = useAppSelector(state => state.auth);

	useEffect(() => {
		if (!isLoggedIn && authData.token === '') {
			router.push('/auth/login');
			return;
		}
	}, [isLoggedIn]);
};

export default useAuthentication;
