import {Metadata} from '@/domain/vo/BaseMetadata';

export type CreateRoleAccessResponse = {
	status: string;
	data: {
		success: string;
		metadata: Metadata;
	};
};
