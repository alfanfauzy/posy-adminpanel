export type CategoryBased = {
	uuid: string;
	name: string;
	restaurant_uuid: string;
	is_active: boolean;
	seconds: number;
};

export type Category = CategoryBased;
export type Categorys = Array<Category>;

export type FormCategory = {
	category_name: string;
	is_active: boolean;
};
