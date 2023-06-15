export type SideBarTopEntities = {
	onClick: () => void;
};
export type SingleMenuEntities = {
	itemMenu: {
		label: string;
		icon: React.ReactNode;
		type: 'single-menu' | 'sub-menu';
		path?: string;
		show?: boolean;
	};
	goToPage: (path: string) => void;
};
export type SubMenuEntities = {
	itemMenu: {
		label: string;
		icon: React.ReactNode;
		type: 'single-menu' | 'sub-menu';
		path?: string;
		show?: boolean;
		items?: Array<{
			show?: boolean;
			label: string;
			path: string;
		}>;
	};
	goToPage: (path: string) => void;
};

export enum typeMenu {
	'singleMenu' = 'single-menu',
	'subMenu' = 'sub-menu',
}

export type MenuSidebar = Array<{
	label: string;
	icon: React.ReactNode;
	type: typeMenu;
	path?: string;
	show?: boolean;
	items?: Array<{
		label: string;
		path: string;
	}>;
}>;
