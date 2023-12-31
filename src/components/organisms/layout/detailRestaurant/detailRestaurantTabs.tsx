import {useAccessControl} from '@/hooks/useAccessControl';
import ListCategoryMenuLayout from '@/pages/user/categoryMenu';
import ListUserRestaurantLayout from '@/pages/user/listUserRestaurant';
import ManageOutletLayout from '@/pages/user/manageOutlet';
import PaymentSettingLayout from '@/pages/user/paymentSetting';
import ListProductMenuLayout from '@/pages/user/productMenu';
import UserSubscriptionLayout from '@/pages/user/subscription';
import {Tabs} from 'posy-fnb-core';
import React, {useState} from 'react';
import {useAppSelector} from 'store/hooks';

const Item = [
	{label: 'Outlet'},
	{label: 'Category'},
	{label: 'Product'},
	{label: 'User'},
	{label: 'Subscription History'},
	{label: 'Payment Setting'},
];

const OrganismDetailRestaurantTabs = () => {
	const [tabsVal, setTabsVal] = useState(0);
	const {hasAccess} = useAccessControl();

	const {uuid} = useAppSelector(state => state.restaurant);

	return (
		<section className="mt-10">
			<Tabs items={Item} value={tabsVal} onChange={e => setTabsVal(e)} />

			{tabsVal === 0 && <ManageOutletLayout restaurant_uuid={uuid} />}
			{tabsVal === 1 && <ListCategoryMenuLayout restaurant_uuid={uuid} />}
			{tabsVal === 2 && <ListProductMenuLayout restaurant_uuid={uuid} />}
			{tabsVal === 3 && <ListUserRestaurantLayout restaurant_uuid={uuid} />}
			{tabsVal === 4 && <UserSubscriptionLayout restaurant_uuid={uuid} />}
			{hasAccess('payment_integration:view') && tabsVal === 5 && (
				<PaymentSettingLayout tabsVal={tabsVal} />
			)}
		</section>
	);
};

export default OrganismDetailRestaurantTabs;
