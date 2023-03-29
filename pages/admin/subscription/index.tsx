import useAuthentication from '@/hooks/useAuthentication';
import MoleculesMetaHeader from '@/molecules/meta-header';
import SubscriptionLayout from '@/pages/admin/subscription';
import GeneralLayout from '@/templates/layouts';
import React from 'react';

const SubscriptionPage = () => {
	// Handle Authentication
	useAuthentication();

	return (
		<>
			<MoleculesMetaHeader
				title="Subscription - Admin Panel FnB"
				description="Subscription - Admin Panel FnB"
			/>
			<GeneralLayout menu="Admin" subMenu="Subscription">
				<SubscriptionLayout />
			</GeneralLayout>
		</>
	);
};

export default SubscriptionPage;
