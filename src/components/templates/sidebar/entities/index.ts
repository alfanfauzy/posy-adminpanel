export type SideBarTopEntities = {
	onClick: () => void;
};
export type SingleMenuEntities = {
	itemMenu: {
		label: string;
		icon: React.ReactNode;
		type: string;
		path?: string;
		show?: boolean;
	};
	goToPage: (path: string) => void;
};
export type SubMenuEntities = {
	itemMenu: {
		label: string;
		icon: React.ReactNode;
		type: string;
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
export type MenuSidebar = {
	listMenus: Array<{
		label: string;
		icon: React.ReactNode;
		type: string;
		path?: string;
		show?: boolean;
		items?: Array<{
			label: string;
			path: string;
		}>;
	}>;
};
