import {FormAddonVariant} from '@/domain/addon-variant/models';
import {FormAddon} from '@/domain/addon/models';

export type ProductBased = {
	uuid: string;
	restaurant_uuid: string;
	name: string;
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
	categories: Array<string>;
	seconds: number;
};

export type Product = ProductBased;
export type Products = Array<ProductBased>;

type AddonVariant = Omit<
	FormAddonVariant,
	'restaurant_uuid' | 'product_uuid' | 'product_addon_uuid' | 'variant_price'
> & {variant_price: number};

type Addon = Omit<FormAddon, 'restaurant_uuid' | 'product_uuid'> & {
	max_variant: number;
	addon_priority: number;
	variants: Array<AddonVariant>;
};

export type FormProduct = {
	restaurant_uuid: string;
	product_name: string;
	product_description: string;
	product_image_url: string;
	is_favourite: boolean;
	is_show: boolean;
	is_available: boolean;
	price: number;
	price_after_discount: number;
	cooking_duration: number;
	restaurant_outlet_uuids: Array<string>;
	category_uuids: Array<string>;
	addons: Array<Addon>;
};
