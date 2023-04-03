import useAuthentication from '@/hooks/useAuthentication';
import MoleculesMetaHeader from '@/molecules/meta-header';
import GeneralLayout from '@/templates/layouts';
import React from 'react';

// export async function getServerSideProps: GetServerSideProps({req, res}) {
// 	const {user} = req.cookies; // get user information from cookies

// 	if (!user) {
// 		// if user not found in cookies, redirect to login page
// 		res.setHeader('location', '/login');
// 		res.statusCode = 302;
// 		res.end();
// 	}

// 	return {props: {}};
// }

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
