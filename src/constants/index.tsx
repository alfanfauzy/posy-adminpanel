import { AiFillHome } from 'react-icons/ai'
import {
  MdOutlineGroup,
  MdGroups,
  MdAccountBalanceWallet,
} from 'react-icons/md'

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
  {
    label: 'User',
    icon: <MdGroups />,
    type: 'sub-menu',
    items: [
      {
        label: 'List Restaurant',
        path: '/user/list-restaurant',
      },
      {
        label: 'Manage Outlet',
        path: '/user/manage-outlet',
      },
      {
        label: 'List User',
        path: '/user/list-user-restaurant',
      },
      {
        label: 'Role User',
        path: '/user/role-user',
      },
    ],
  },
  {
    label: 'History',
    icon: <MdAccountBalanceWallet />,
    type: 'sub-menu',
    items: [
      {
        label: 'Transaction',
        path: '/history/transaction',
      },
    ],
  },
]
