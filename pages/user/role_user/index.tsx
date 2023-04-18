import MoleculesMetaHeader from '@/molecules/meta-header';
import RoleUserLayout from '@/pages/user/role';
import GeneralLayout from '@/templates/layouts';
import React from 'react';

const RoleUserPage = () => {
	return (
		<>
			<MoleculesMetaHeader
				title="Role User - Admin Panel FnB"
				description="Role User - Admin Panel FnB"
			/>
			<GeneralLayout menu="User" subMenu="Role User">
				<RoleUserLayout />
			</GeneralLayout>
		</>
	);
};

export default RoleUserPage;
