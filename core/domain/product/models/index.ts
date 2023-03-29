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
