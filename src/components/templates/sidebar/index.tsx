import Footer from '@/atoms/footer';
import {generateUniqueId} from '@/constants/utils';
import useMenu from '@/hooks/useMenu';
import Image from 'next/image';
import {useRouter} from 'next/router';
import React from 'react';
import {
	Menu,
	MenuItem,
	Sidebar,
	SubMenu,
	useProSidebar,
} from 'react-pro-sidebar';

import {
	MenuSidebar,
	SideBarTopEntities,
	SingleMenuEntities,
	SubMenuEntities,
} from './entities';

const PVGLogo = require('public/pvg-logo.png');

const SidebarTop = ({onClick}: SideBarTopEntities) => (
	<span
		tabIndex={0}
		role="button"
		className="mt-3 flex cursor-pointer items-center justify-center p-3"
		onClick={() => onClick()}
		onKeyDown={() => onClick()}
	>
		<Image
			src={PVGLogo}
			alt="PVG Image Logo"
			className="w-[200px]"
			height={100}
			width={200}
		/>
	</span>
);

const SingleMenuContent = ({itemMenu, goToPage}: SingleMenuEntities) => {
	const {icon, label, path = ''} = itemMenu;

	const {asPath} = useRouter();

	return (
		<MenuItem
			icon={icon}
			onClick={() => goToPage(path)}
			className={`py-1 transition-all duration-300 ease-in-out ${
				asPath.indexOf(path) !== -1
					? 'bg-[#00ba9b] text-white'
					: 'hover:rounded-lg hover:bg-slate-100'
			}`}
			active={asPath.indexOf(path) !== -1}
		>
			{label}
		</MenuItem>
	);
};

const SubMenuMenuContent = ({itemMenu, goToPage}: SubMenuEntities) => {
	const {icon, label, items = []} = itemMenu;
	const {asPath} = useRouter();

	const firstPath = asPath.split('/')[1];

	return (
		<SubMenu
			label={label}
			icon={icon}
			defaultOpen={firstPath === label.toLocaleLowerCase()}
		>
			{items?.map(item => {
				if (item.show) {
					return (
						<MenuItem
							key={generateUniqueId(5)}
							onClick={() => goToPage(item.path ?? '')}
							className={`transition-all duration-300 ease-in-out ${
								// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
								asPath === item.path
									? 'bg-[#00ba9b] text-white'
									: 'hover:bg-slate-100'
							}`}
						>
							{' '}
							{item.label}
						</MenuItem>
					);
				}
			})}
		</SubMenu>
	);
};

type SidebarContentProps = {
	listMenus: MenuSidebar;
};

const SidebarContent = ({listMenus}: SidebarContentProps) => {
	const router = useRouter();

	const goToPage = (path: string) => {
		router.push(path);
	};

	return (
		<Menu
			transitionDuration={500}
			rootStyles={{
				[`.ps-submenu-content`]: {
					overflow: 'hidden !important',
				},
				[`.ps-active`]: {
					backgroundColor: '#01B89D',
					fontWeight: '600',
				},
			}}
		>
			{listMenus.map(menu => {
				if (menu.type === 'single-menu' && menu.show) {
					return (
						<SingleMenuContent
							key={generateUniqueId(5)}
							itemMenu={menu}
							goToPage={goToPage}
						/>
					);
				}

				if (menu.show) {
					return (
						<SubMenuMenuContent
							key={generateUniqueId(5)}
							itemMenu={menu}
							goToPage={goToPage}
						/>
					);
				}
			})}
		</Menu>
	);
};

const OrganismSidebar = () => {
	const {collapseSidebar} = useProSidebar();
	const menuList: MenuSidebar = useMenu();

	return (
		<Sidebar
			breakPoint="lg"
			className="border-r-2 bg-white"
			transitionDuration={1000}
			rootStyles={{[`.ps-menu-root`]: {fontSize: '0.9rem !important'}}}
		>
			<SidebarTop onClick={collapseSidebar} />
			<div className="flex w-full flex-col">
				<div className="mb-8 h-full flex-1">
					<SidebarContent listMenus={menuList} />
				</div>
			</div>
			<Footer isFixed />
		</Sidebar>
	);
};

export default OrganismSidebar;
