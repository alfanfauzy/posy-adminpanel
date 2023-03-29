import React from 'react';

export type AuthLayoutProps = {
	children: React.ReactNode;
};

const AuthLayout = (props: AuthLayoutProps) => {
	const {children} = props;
	return <main>{children}</main>;
};

export default AuthLayout;
