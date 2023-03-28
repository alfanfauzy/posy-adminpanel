import ListCategoryMenuLayout from '@/pages/user/categoryMenu';
import ManageOutletLayout from '@/pages/user/manageOutlet';
import ListProductMenuLayout from '@/pages/user/productMenu';
import UserSubscriptionLayout from '@/pages/user/subscription';
import {Tabs} from 'posy-fnb-core';
import React, {useState} from 'react';
import {useAppSelector} from 'store/hooks';

const Item = [
	{label: 'Outlet'},
	{label: 'Category'},
	{label: 'Product'},
	{label: 'Subscription History'},
];

const OrganismDetailRestaurantTabs = () => {
	const [tabsVal, setTabsVal] = useState(0);

	const {uuid} = useAppSelector(state => state.restaurant);

	return (
		<section className="mt-10">
			<Tabs items={Item} value={tabsVal} onChange={e => setTabsVal(e)} />

			{tabsVal === 0 && <ManageOutletLayout restaurant_uuid={uuid} />}
			{tabsVal === 1 && <ListCategoryMenuLayout restaurant_uuid={uuid} />}
			{tabsVal === 2 && <ListProductMenuLayout />}
			{tabsVal === 3 && <UserSubscriptionLayout />}
		</section>
	);
};

export default OrganismDetailRestaurantTabs;
