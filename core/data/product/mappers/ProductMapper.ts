import {Products} from '@/domain/product/models';

import {GetListProductDataResponse} from '../types';

export const mapToProductModel = (
	datas: Array<GetListProductDataResponse>,
): Products =>
	datas.map(data => ({
		uuid: data.uuid,
		name: data.product_name,
		restaurant_uuid: data.restaurant_uuid,
		product_description: data.product_description,
		product_image: data.product_image,
		product_image_url: data.product_image_url,
		is_favourite: data.is_favourite,
		is_discount: data.is_discount,
		cooking_duration: data.cooking_duration,
		price: data.price,
		price_after_discount: data.price_after_discount,
		price_discount: data.price_discount,
		price_discount_percentage: data.price_discount_percentage,
		price_final: data.price_final,
		seconds: data.metadata.created_at.seconds,
		categories: data.categories.map(category => category.name),
	}));
