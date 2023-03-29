export type LoginTimeResponse = {
	seconds: number;
	nanos: number;
};

export type AccessResponse = {
	uuid: string;
	name: string;
	key: string;
	description: string;
};

export type RoleResponse = {
	uuid: string;
	name: string;
	is_internal: boolean;
};

export type RoleAccessResponse = {
	role: RoleResponse;
	access: Array<AccessResponse>;
};

export type LoginDataResponse = {
	uuid: string;
	token: string;
	refresh_token: string;
	expired_at: LoginTimeResponse;
	role_access: RoleAccessResponse;
};
