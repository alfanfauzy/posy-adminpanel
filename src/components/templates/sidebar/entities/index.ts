import { ReactNode } from 'react'

export interface SideBarTopEntities {
  onClick: () => void
}
export interface SingleMenuEntities {
  itemMenu: {
    label: string
    icon: JSX.Element
    type: string
    path: string
  }
  goToPage: (path: string) => void
}
export interface SubMenuEntities {
  itemMenu: {
    label: string
    icon?: JSX.Element
    type: string
    path?: string
    items?: [
      {
        label: string
        icon?: JSX.Element
        path?: string
      },
    ]
  }
  goToPage: (path: string) => void
}
export interface MenuSidebar {
  listMenus: [
    {
      label: string
      icon: JSX.Element
      type: string
      path: string
      items?: [{ label: string; path?: string; icon?: JSX.Element }]
    },
  ]
}
