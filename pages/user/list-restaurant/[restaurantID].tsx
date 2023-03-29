import useAuthentication from '@/hooks/useAuthentication';
import MoleculesMetaHeader from '@/molecules/meta-header';
import RestaurantDetailLayout from '@/pages/user/detailRestaurant/';
import GeneralLayout from '@/templates/layouts';
import React from 'react';

const RestaurantDetailPage = () => {
	useAuthentication();

	return (
		<>
			<MoleculesMetaHeader
				title="Detail Restaurant - Admin Panel FnB"
				description="Detail Restaurant - Admin Panel FnB"
			/>
			<GeneralLayout menu="User" subMenu="Detail Restaurant">
				<RestaurantDetailLayout />
			</GeneralLayout>
		</>
	);
};

export default RestaurantDetailPage;
