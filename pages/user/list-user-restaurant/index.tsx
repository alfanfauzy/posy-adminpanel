import useAuthentication from '@/hooks/useAuthentication';
import MoleculesMetaHeader from '@/molecules/meta-header';
import ListUserRestaurantLayout from '@/pages/user/listUserRestaurant';
import GeneralLayout from '@/templates/layouts';
import React from 'react';

const ListUserRestaurantPage = () => {
	// Handle Authentication
	useAuthentication();

	return (
		<>
			<MoleculesMetaHeader
				title="List User Restaurant - Admin Panel FnB"
				description="List User Restaurant - Admin Panel FnB"
			/>
			<GeneralLayout menu="User" subMenu="List User">
				<ListUserRestaurantLayout />
			</GeneralLayout>
		</>
	);
};

export default ListUserRestaurantPage;
