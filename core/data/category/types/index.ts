import {Metadata} from '@/domain/vo/BaseMetadata';

export type GetCategoryListDataResponse = {
	uuid: string;
	category_name: string;
	restaurant_uuid: string;
	is_active: boolean;
	metadata: Metadata;
};

export type CreateCategoryResponse = {
	code: number;
	data: {
		uuid: string;
		metadata: Metadata;
	};
};

export type UpdateAdminResponse = CreateCategoryResponse;
