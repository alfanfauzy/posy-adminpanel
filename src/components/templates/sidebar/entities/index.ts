export interface SideBarTopEntities {
  onClick: () => void
}
export interface SingleMenuEntities {
  itemMenu: {
    label: string
    icon: React.ReactNode
    type: string
    path?: string
  }
  goToPage: (path: string) => void
}
export interface SubMenuEntities {
  itemMenu: {
    label: string
    icon: React.ReactNode
    type: string
    path?: string
    items?: {
      label: string
      path: string
    }[]
  }
  goToPage: (path: string) => void
}
export interface MenuSidebar {
  listMenus: {
    label: string
    icon: React.ReactNode
    type: string
    path?: string
    items?: {
      label: string
      path: string
    }[]
  }[]
}
