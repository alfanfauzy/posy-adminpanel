import MoleculesMetaHeader from '@/molecules/meta-header';
import ListRestaurantLayout from '@/pages/user/listRestaurant';
import GeneralLayout from '@/templates/layouts';
import React from 'react';

const ListRestaurantPage = () => {
	return (
		<>
			<MoleculesMetaHeader
				title="List Restaurant - Admin Panel FnB"
				description="List Restaurant - Admin Panel FnB"
			/>
			<GeneralLayout menu="User" subMenu="List Restaurant">
				<ListRestaurantLayout />
			</GeneralLayout>
		</>
	);
};

export default ListRestaurantPage;
