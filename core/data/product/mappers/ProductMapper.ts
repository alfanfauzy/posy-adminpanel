import {Product, Products} from '@/domain/product/models';

import {GetListProductDataResponse} from '../types';
import {GetDetailProductResponse} from './../types/index';

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
		categories: data.categories.map(category => ({
			value: category.uuid,
			label: category.name,
		})),
		restaurant_outlets: data.restaurant_outlets?.map(outlet => ({
			value: outlet.uuid,
			label: outlet.name,
		})),
		is_available: data.is_available,
		is_show: data.is_show,
	}));

export const mapToDetailProductModel = (
	datas: GetDetailProductResponse,
): Product => ({
	uuid: datas.product.uuid,
	name: datas.product.product_name,
	product_image_url: datas.product.product_image_url,
	product_description: datas.product.product_description,
	price_final: datas.product.price_final,
	price_discount_percentage: datas.product.price_discount_percentage,
	price_after_discount: datas.product.price_after_discount,
	price_discount: datas.product.price_discount,
	price: datas.product.price,
	is_favourite: datas.product.is_favourite,
	is_discount: datas.product.is_discount,
	is_available: datas.product.is_available,
	cooking_duration: datas.product.cooking_duration,
	restaurant_outlets: datas.product.restaurant_outlets?.map(outlet => ({
		value: outlet.uuid,
		label: outlet.name,
	})),
	categories: datas.product.categories?.map(category => ({
		value: category.uuid,
		label: category.category_name,
	})),
	addons: datas.addons?.map(el => ({
		uuid: el.uuid,
		addon_name: el.addon_name,
		can_choose_multiple: el.can_choose_multiple,
		is_optional: el.is_optional,
		max_variant: el.max_variant,
		min_variant: el.min_variant,
		variants: el.variants.map(variant => ({
			variant_uuid: variant.uuid,
			variant_name: variant.variant_name,
			variant_priority: variant.variant_priority,
			variant_price: variant?.variant_price || 0,
		})),
	})),
	is_show: datas.product.is_show,
	product_image: datas.product.product_image_url,
	restaurant_uuid: datas.product.restaurant_uuid,
});
