import React, {useMemo} from 'react';
import {MdAccountBalanceWallet, MdGroups, MdOutlineGroup} from 'react-icons/md';
import {useAppSelector} from 'store/hooks';

const useMenu = () => {
	const permissions = useAppSelector(state => state.auth.permission);

	const Menu = useMemo(
		() => [
			{
				label: 'Admin',
				icon: <MdOutlineGroup />,
				type: 'sub-menu',
				show:
					permissions.includes('admin') ||
					permissions.includes('role_admin') ||
					permissions.includes('subscription'),
				items: [
					{
						label: 'List Admin',
						path: '/admin/admin',
						show: permissions.includes('admin'),
					},
					{
						label: 'Role & Permission',
						path: '/admin/role_admin',
						show: permissions.includes('role_admin'),
					},
					{
						label: 'Subscription Plan',
						path: '/admin/subscription',
						show: permissions.includes('subscription'),
					},
				],
			},
			{
				label: 'User',
				icon: <MdGroups />,
				type: 'sub-menu',
				show:
					permissions.includes('restaurant') ||
					permissions.includes('restaurant_outlet') ||
					permissions.includes('product') ||
					permissions.includes('role') ||
					permissions.includes('access') ||
					permissions.includes('product_outlet'),
				items: [
					{
						label: 'List Restaurant',
						path: '/user/restaurant',
						show: permissions.includes('restaurant'),
					},
					{
						label: 'Manage Outlet',
						path: '/user/restaurant_outlet',
						show: permissions.includes('restaurant_outlet'),
					},
					{
						label: 'List User',
						path: '/user/restaurant_user',
						show: permissions.includes('restaurant_user'),
					},
					{
						label: 'Role User',
						path: '/user/role_user',
						show: permissions.includes('role_user'),
					},
					{
						label: 'User Subscription',
						path: '/user/subscription',
						show: permissions.includes('subscription'),
					},
				],
			},
			{
				label: 'History',
				icon: <MdAccountBalanceWallet />,
				type: 'sub-menu',
				show: permissions.includes('report'),
				items: [
					{
						label: 'Transaction',
						path: '/history/report',
						show: permissions.includes('report'),
					},
				],
			},
		],
		[permissions],
	);

	return Menu;
};

export default useMenu;
