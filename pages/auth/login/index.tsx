import MoleculesMetaHeader from '@/molecules/meta-header';
import LoginPage from '@/pages/login';
import AuthLayout from '@/templates/layouts/auth-layout';
import React from 'react';

import {NextPageWithLayout} from '../../_app';

const Page: NextPageWithLayout = () => {
	return (
		<>
			<MoleculesMetaHeader
				title="Admin Panel Fnb - Login"
				description="Admin Panel FnB"
			/>
			<LoginPage />
		</>
	);
};

Page.getLayout = page => <AuthLayout>{page}</AuthLayout>;
export default Page;
