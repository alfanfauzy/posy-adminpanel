// hex to rgba converter
export const hexToRgba = (hex: string, alpha: number) => {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);

	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const themes = {
	light: {
		sidebar: {
			backgroundColor: '#ffffff',
			color: '#607489',
		},
		menu: {
			menuContent: '#fbfcfd',
			icon: '#0098e5',
			hover: {
				backgroundColor: '#c5e4ff',
				color: '#44596e',
			},
			disabled: {
				color: '#9fb6cf',
			},
		},
	},
};

export const sidebarClasses = {
	root: 'ps-sidebar-root',
	container: 'ps-sidebar-container',
	image: 'ps-sidebar-image',
	backdrop: 'ps-sidebar-backdrop',
	collapsed: 'ps-collapsed',
	toggled: 'ps-toggled',
	rtl: 'ps-rtl',
	broken: 'ps-broken',
};

export const menuClasses = {
	root: 'ps-menu-root',
	menuItemRoot: 'ps-menuitem-root',
	subMenuRoot: 'ps-submenu-root',
	button: 'ps-menu-button',
	prefix: 'ps-menu-prefix',
	suffix: 'ps-menu-suffix',
	label: 'ps-menu-label',
	icon: 'ps-menu-icon',
	subMenuContent: 'ps-submenu-content',
	SubMenuExpandIcon: 'ps-submenu-expand-icon',
	disabled: 'ps-disabled',
	active: 'ps-active',
	open: 'ps-open',
};
