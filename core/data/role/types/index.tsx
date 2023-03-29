import {AccessBased} from '@/domain/access/models';
import {Metadata} from '@/domain/vo/BaseMetadata';

export type GetRoleListDataResponse = {
	uuid: string;
	name: string;
	description: string;
	is_internal: boolean;
	accesses: AccessBased;
	metadata: Metadata;
};

export type CreateRoleResponse = {
	code: number;
	data: {
		uuid: string;
		metadata: Metadata;
	};
};

export type UpdateRoleResponse = CreateRoleResponse;

export type DeleteRoleResponse = CreateRoleResponse;
