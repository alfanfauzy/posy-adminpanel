import MoleculesMetaHeader from '@/molecules/meta-header';
import RolePermissionLayout from '@/pages/admin/role';
import GeneralLayout from '@/templates/layouts';
import React from 'react';

const RolePermissionPage = () => {
	return (
		<>
			<MoleculesMetaHeader
				title="Role Permission - Admin Panel FnB"
				description="Role Permission - Admin Panel FnB"
			/>
			<GeneralLayout menu="Admin" subMenu="Role & Permission">
				<RolePermissionLayout />
			</GeneralLayout>
		</>
	);
};

export default RolePermissionPage;
