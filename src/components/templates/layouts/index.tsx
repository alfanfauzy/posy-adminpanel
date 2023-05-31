import useAuthentication from '@/hooks/useAuthentication';
import MoleculesBreadcrumb from '@/molecules/breadcrumb';
import TemplatesHeader from '@/templates/header';
import OrganismSidebar from '@/templates/sidebar';
import {motion} from 'framer-motion';
import {useRouter} from 'next/router';
import React, {useEffect} from 'react';
import {ProSidebarProvider} from 'react-pro-sidebar';
import {toast} from 'react-toastify';
import {useAppSelector} from 'store/hooks';

export type GeneralLayoutProps = {
	children: React.ReactNode;
	menu: string;
	subMenu?: string;
};

const GeneralLayout = ({children, menu, subMenu}: GeneralLayoutProps) => {
	const router = useRouter();

	const permissions = useAppSelector(state => state.auth.permission);

	useAuthentication();

	useEffect(() => {
		const paramPathName = router.pathname.split('/')[2];

		if (router.pathname === '/dashboard') {
			return;
		}

		if (router.pathname === 'payment') {
			router.push('/payment');
			return;
		}

		// if (!permissions.includes(paramPathName)) {
		// 	router.push('/dashboard');
		// 	toast.error(`You don't have permission`);
		// }
	}, [router.pathname]);

	return (
		<ProSidebarProvider>
			<main className="flex min-h-screen w-full bg-gray-300 bg-opacity-40">
				<OrganismSidebar />

				<section className="flex w-full flex-col">
					<TemplatesHeader />

					<div className="rounded-tl-lg border-2 bg-slate-100 p-7">
						<MoleculesBreadcrumb menu={menu} subMenu={subMenu} />

						<motion.div
							initial={{opacity: 0}}
							animate={{opacity: 1}}
							transition={{
								delay: 0.1,
								x: {duration: 1},
								default: {ease: 'linear'},
							}}
							className="h-auto w-auto rounded-md border border-gray-200 bg-white p-7 shadow-md"
						>
							{children}
						</motion.div>
					</div>
				</section>
			</main>
		</ProSidebarProvider>
	);
};

export default GeneralLayout;
