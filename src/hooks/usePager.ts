/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useMemo, useState} from 'react';

const defaultPagerProps = {
	current: 1,
	pageSize: 20,
};

export const usePager = (params: object, pagerProps = {}) => {
	const props = useMemo(
		() => ({
			...defaultPagerProps,
			...pagerProps,
		}),
		[JSON.stringify(pagerProps)],
	);

	const [page, setPage] = useState(props.current);

	const skip = useMemo(
		() => (page - 1) * props.pageSize,
		[page, props.pageSize],
	);
	useEffect(() => {
		setPage(1);
	}, [JSON.stringify(params)]);

	return {
		page,
		setPage,
		skip,
		limit: props.pageSize,
	};
};
