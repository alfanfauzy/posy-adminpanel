import {Role} from '@/domain/role/models';
import {Metadata} from '@/domain/vo/BaseMetadata';
import {GetRoleListDataResponse} from 'core/data/role/types/index';
/**
 * This File is docomentation type of response from the server
 */

/** GET USER RESTAURANT */

export type RestaurantObject = {
	outlet_uuid: string;
	outlet_name: string;
	outlet_code: string;
	restaurant_uuid: string;
	restaurant_name: string;
	restaurant_code: string;
};

export type GetUserRestaurantResponse = {
	uuid: string;
	email: string;
	fullname: string;
	phone: string;
	role: Role;
	is_admin: string;
	metadata: Metadata;
	restaurant_user: Array<RestaurantObject>;
};

export type CreateUserRestaurantResponse = {
	code: number;
	data: {
		uuid: string;
		metadata: Metadata;
	};
};

export type UpdateUserRestaurantResponse = CreateUserRestaurantResponse;

export type DeleteUserRestaurantResponse = CreateUserRestaurantResponse;
