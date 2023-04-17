import MoleculesMetaHeader from '@/molecules/meta-header';
import AdminListLayout from '@/pages/admin/list';
import GeneralLayout from '@/templates/layouts';
import React from 'react';

const ListAdminPage = () => {
	return (
		<>
			<MoleculesMetaHeader
				title="List Admin - Admin Panel FnB"
				description="List Admin - Admin Panel FnB"
			/>
			<GeneralLayout menu="Admin" subMenu="List Admin">
				<AdminListLayout />
			</GeneralLayout>
		</>
	);
};

export default ListAdminPage;
