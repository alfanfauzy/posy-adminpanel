import useAuthentication from '@/hooks/useAuthentication';
import MoleculesMetaHeader from '@/molecules/meta-header';
import GeneralLayout from '@/templates/layouts';
import React from 'react';

const DashboardPage = () => {
	// Handle Authentication
	useAuthentication();

	return (
		<>
			<MoleculesMetaHeader
				title="Dashboard - Admin Panel Fnb"
				description="Dashboard - Admin Panel Fnb"
			/>
			<GeneralLayout menu="Dashboard">
				<span className="flex items-center justify-center">Dashboard</span>
			</GeneralLayout>
		</>
	);
};

export default DashboardPage;
