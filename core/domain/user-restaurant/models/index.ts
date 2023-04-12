/**
 * This File is docomentation type which can be used to describe to the variables in view
 */

import {RestaurantObject} from '@/data/user-restaurant/types';
import {Role} from '@/domain/role/models';

export type UserRestaurantBased = {
	uuid: string;
	name: string;
	email: string;
	phone: string;
	outlet: Array<RestaurantObject>;
	role: Role;
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
