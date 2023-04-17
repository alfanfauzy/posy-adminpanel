import MoleculesMetaHeader from '@/molecules/meta-header';
import ManageOutletLayout from '@/pages/user/manageOutlet';
import GeneralLayout from '@/templates/layouts';
import React from 'react';

const ManageOutletPage = () => {
	return (
		<>
			<MoleculesMetaHeader
				title="Manage Outlet - Admin Panel FnB"
				description="Manage Outlet - Admin Panel FnB"
			/>
			<GeneralLayout menu="User" subMenu="Manage Outlet">
				<ManageOutletLayout />
			</GeneralLayout>
		</>
	);
};

export default ManageOutletPage;
