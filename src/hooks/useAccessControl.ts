import {useState, useEffect, useMemo} from 'react';
import {useAppSelector} from 'store/hooks';

export function useAccessControl() {
	const [accessLevel, setAccessLevel] = useState<Array<string>>([]);

	const access = useAppSelector(
		state => state.auth.authData.role_access.accesses,
	);

	const toNewObjectAccess = useMemo(
		() => Object.fromEntries(access.map(item => [item.key, item.key])),
		[access],
	);

	type DynamicKeys = keyof typeof toNewObjectAccess;

	useEffect(() => {
		const getListAccess = access.map(dataAccess => dataAccess.key);
		setAccessLevel(getListAccess);
	}, [access]);

	function hasAccess(permission: DynamicKeys) {
		return accessLevel.includes(permission as string);
	}

	return {hasAccess};
}
