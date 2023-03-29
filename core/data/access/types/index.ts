import {Metadata} from '@/domain/vo/BaseMetadata';

export type GetAccessListDataResponse = {
	uuid: string;
	name: string;
	description: string;
	key: string;
	is_internal: boolean;
	metadata: Metadata;
};

export type CreateAccessResponse = {
	code: number;
	data: {
		uuid: string;
		metadata: Metadata;
	};
};

export type UpdateAccessResponse = CreateAccessResponse;
export type DeleteAccessResponse = CreateAccessResponse;
