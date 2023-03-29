import {AccessBased} from '@/domain/access/models';

export type RoleBased = {
	uuid: string;
	name: string;
	description: string;
	accesses: AccessBased | [];
	seconds: number;
	is_internal: boolean;
};

export type Role = RoleBased;

export type Roles = Array<RoleBased>;
