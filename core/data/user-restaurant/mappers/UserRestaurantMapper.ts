import {UserRestaurants} from '@/domain/user-restaurant/models';

import {GetUserRestaurantResponse} from '../types';

export const mapToUserRestaurantModel = (
	datas: Array<GetUserRestaurantResponse>,
): UserRestaurants =>
	datas.map(data => ({
		uuid: data.uuid,
		name: data.fullname,
		email: data.email,
		outlet: data.restaurant_user,
		phone: data.phone,
		role: data.role,
		seconds: data.metadata.created_at.seconds,
		is_admin: data.is_admin,
	}));
