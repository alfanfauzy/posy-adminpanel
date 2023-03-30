import {Category} from '@/domain/category/models';
import {Metadata} from '@/domain/vo/BaseMetadata';

export type GetListProductDataResponse = {
	uuid: string;
	restaurant_uuid: string;
	product_name: string;
	product_description: string;
	product_image: string;
	product_image_url: string;
	is_favourite: boolean;
	is_discount: boolean;
	price: number;
	price_discount: number;
	price_after_discount: number;
	price_discount_percentage: number;
	price_final: number;
	cooking_duration: number;
	categories: Array<Category>;
	metadata: Metadata;
};

export type CreateProductResponse = {
	code: number;
	data: {
		uuid: string;
		metadata: Metadata;
	};
};

export type UpdateProductResponse = CreateProductResponse;
