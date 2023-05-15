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
