import OrganismDetailRestaurant from '@/organisms/layout/detailRestaurant';
import OrganismDetailRestaurantTabs from '@/organisms/layout/detailRestaurant/detailRestaurantTabs';
import React from 'react';

const RestaurantDetailLayout = () => (
	<div>
		<OrganismDetailRestaurant />
		<OrganismDetailRestaurantTabs />
	</div>
);

export default RestaurantDetailLayout;
