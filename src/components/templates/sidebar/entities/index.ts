export interface SideBarTopEntities {
  onClick: () => void
}

export interface MenuItemEntities {
  label: string
  icon: any
}

export interface MenusEntities {
  label: string
  icon: any
  type: string
  items?: MenuItemEntities[]
}

export interface SidebarEntities {
  listMenus: MenusEntities[]
}

export interface SingleMenuEntities {
  itemMenu: MenuItemEntities
}

export interface SubMenuEntities {
  itemMenu: MenusEntities
}
