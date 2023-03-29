/**
 * Footer
 */

import React from 'react';

type FooterProps = {
	isFixed?: boolean;
};

const Footer = ({isFixed = false}: FooterProps) => {
	const date = new Date();
	const year = date.getFullYear();

	return (
		<footer
			className={`mt-4 w-full text-center text-xs text-slate-500 ${
				isFixed && 'absolute bottom-0 mb-3 p-2'
			}`}
		>
			@{year} Pintar Ventura Group
		</footer>
	);
};

export default Footer;
