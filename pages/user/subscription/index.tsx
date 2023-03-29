import useAuthentication from '@/hooks/useAuthentication';
import MoleculesMetaHeader from '@/molecules/meta-header';
import UserSubscriptionLayout from '@/pages/user/subscription';
import GeneralLayout from '@/templates/layouts';
import React from 'react';

const UserSubscriptionPage = () => {
	// Handle Authentication
	useAuthentication();

	return (
		<>
			<MoleculesMetaHeader
				title="User Subscription - Admin Panel FnB"
				description="User Subscription - Admin Panel FnB"
			/>
			<GeneralLayout menu="User" subMenu="User Subscription">
				<UserSubscriptionLayout />
			</GeneralLayout>
		</>
	);
};

export default UserSubscriptionPage;
