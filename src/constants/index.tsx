import { AiFillHome } from 'react-icons/ai'
import { MdOutlineGroup } from 'react-icons/md'

export const TITLE = {
  DEFAULT_TITLE: 'Admin Panel - Posy FNB',
}

export const MENU_LIST = [
  {
    label: 'Dashboard',
    icon: <AiFillHome />,
    type: 'single-menu',
    path: '/dashboard',
  },
  {
    label: 'Admin',
    icon: <MdOutlineGroup />,
    type: 'sub-menu',
    items: [
      {
        label: 'List Admin',
        path: '/admin/list',
      },
      {
        label: 'Role & Permission',
        path: '/admin/role',
      },
    ],
  },
]
