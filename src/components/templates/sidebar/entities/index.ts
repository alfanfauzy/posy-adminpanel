export interface SideBarTopEntities {
  onClick: () => void
}

export interface MenuItemEntities {
  label: string
  icon: any
  path?: string
}

export interface MenusEntities {
  label: string
  icon: any
  type: string
  items: [{ label: string; icon: any; path?: string }]
}

export interface SidebarEntities {
  listMenus: MenusEntities[]
}

export interface SingleMenuEntities {
  itemMenu: MenuItemEntities
  goToPage: (path: string) => void
}

export interface SubMenuEntities {
  itemMenu: MenusEntities
  goToPage: (path: string) => void
}
