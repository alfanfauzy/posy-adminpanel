import {Restaurant} from '@/domain/restaurant/models';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type RestaurantState = Restaurant;

const initialState: RestaurantState = {
	uuid: '',
	name: '',
	email: '',
	phone: '',
	nib: '',
	npwp: '',
	pic_name: '',
	pic_phone: '',
	seconds: 0,
	address: '',
	code: '',
	description: '',
	logo: '',
	subscription_uuid: '',
	subscription_name: '',
};

export const RestaurantSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		restaurantDetail: (
			state: RestaurantState,
			action: PayloadAction<Restaurant>,
		) => {
			state.uuid = action.payload.uuid;
			state.name = action.payload.name;
			state.email = action.payload.email;
			state.phone = action.payload.phone;
			state.nib = action.payload.nib;
			state.npwp = action.payload.npwp;
			state.pic_name = action.payload.pic_name;
			state.pic_phone = action.payload.pic_phone;
			state.seconds = action.payload.seconds;
			state.address = action.payload.address;
			state.code = action.payload.code;
			state.description = action.payload.description;
			state.logo = action.payload.logo;
			state.subscription_uuid = action.payload.subscription_uuid;
			state.subscription_name = action.payload.subscription_name;
		},
	},
});

export const {restaurantDetail} = RestaurantSlice.actions;
export default RestaurantSlice.reducer;
