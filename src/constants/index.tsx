import {MdOutlineGroup, MdGroups, MdAccountBalanceWallet} from 'react-icons/md';
import {store} from 'store/index';

const permissions = store.getState().auth.permission;

export const MENU_LIST = [
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
];

export const Subscription_Period = [
	{label: '1 Month', value: 30},
	{label: '2 Month', value: 60},
	{label: '3 Month', value: 90},
	{label: '4 Month', value: 120},
	{label: '5 Month', value: 150},
	{label: '6 Month', value: 180},
	{label: '7 Month', value: 210},
	{label: '8 Month', value: 240},
	{label: '9 Month', value: 270},
	{label: '10 Month', value: 300},
	{label: '11 Month', value: 330},
	{label: '12 Month', value: 360},
	{label: '24 Month', value: 720},
	{label: '36 Month', value: 1080},
];

export const SERVICE_DOMAIN = {
	user: 'fnb-user-service',
};

export const PASSWORD_REGEX =
	/^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$%^&*-.]).{8,50}$/;

export const VALID_IMAGES_TYPES = [
	'image/gif',
	'image/jpeg',
	'image/png',
	'image/png',
];

export const MAX_FILE_SIZE = 500000;

export const TRANSACTION_CATEGORY = {
	DINE_IN: 'Dine In',
	TAKE_AWAY: 'Take Away',
};

export const TRANSACTION_STATUS = {
	WAITING_ORDER: {label: 'Waiting Order', color: '#003BD4'},
	WAITING_FOOD: {label: 'Waiting Food', color: '#003BD4'},
	FOOD_SERVED: {label: 'Food Served', color: '#003BD4'},
	WAITING_PAYMENT: {label: 'Waiting Payment', color: '#003BD4'},
	PAID: {label: 'Paid', color: '#37B175'},
	CANCELLED: {label: 'Cancel', color: '#f1c40f'},
	REFUND: {label: 'Refund', color: '#CB3A31'},
};
