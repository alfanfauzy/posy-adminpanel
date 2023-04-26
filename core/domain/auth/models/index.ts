import {BaseMetadata} from '@/domain/vo/BaseMetadata';

export type LoginBased = {
	uuid: string;
	name: string;
	is_internal: boolean;
	accesses: Array<Access> | null;
};

export type Access = {
	uuid: string;
	name: string;
	key: string;
	description: string;
	is_internal: boolean;
};

export type RoleAccess = {
	role: LoginBased;
	accesses: Array<Access>;
};

export type UserInfo = {
	user_uuid: string;
	fullname: string;
	email: string;
	phone: string;
};

export type DataLogin = {
	uuid: string;
	token: string;
	refresh_token: string;
	expired_at: BaseMetadata;
	role_access: RoleAccess;
	permission: Array<string>;
	user_info: UserInfo;
};

export type PostLoginPayload = {
	email: string;
	password: string;
};

export type LogoutPayload = {
	user_uuid: string;
	token: string;
};
