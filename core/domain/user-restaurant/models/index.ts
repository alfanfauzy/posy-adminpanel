/**
 * This File is docomentation type which can be used to describe to the variables in view
 */

import {GetRoleListDataResponse} from '@/data/role/types';
import {RestaurantObject} from '@/data/user-restaurant/types';

export type UserRestaurantBased = {
	uuid: string;
	name: string;
	email: string;
	phone: string;
	outlet: Array<RestaurantObject>;
	role: Pick<GetRoleListDataResponse, 'accesses'>;
	is_admin: string;
	seconds: number;
};

export type UserRestaurant = UserRestaurantBased;

export type UserRestaurants = Array<UserRestaurantBased>;

export type FormUserRestaurant = {
	email: string;
	password: string;
	fullname: string;
	phone: string;
	role_uuid: string;
	outlet_uuid: string;
};
