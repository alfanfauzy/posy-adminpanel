import {FormAddonVariant} from '@/domain/addon-variant/models';
import {FormAddon} from '@/domain/addon/models';

import {ObjectSelect} from '../../outlet/entities';

type AddonVariant = Omit<
	FormAddonVariant,
	'restaurant_uuid' | 'product_uuid' | 'product_addon_uuid'
>;

type Addon = Omit<FormAddon, 'restaurant_uuid' | 'product_uuid'> & {
	max_variant?: string | undefined;
	addon_priority?: string | undefined;
	variants: Array<AddonVariant>;
};

export type FormManageProduct = {
	restaurant_uuid: string;
	product_name: string;
	product_description?: string | undefined;
	discount?: string;
	product_image_url?: string | undefined;
	is_favourite: boolean;
	is_show: boolean;
	is_available: boolean;
	price: string;
	price_after_discount: string;
	cooking_duration?: string | undefined;
	restaurant_outlet_uuids: Array<ObjectSelect>;
	category_uuids: Array<ObjectSelect>;
	addons?: Array<Addon> | undefined;
};
