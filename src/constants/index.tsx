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
      {
        label: 'Subscription',
        path: '/admin/subscription',
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

export const Subscription_Period = [
  { label: '1 Bulan', value: '1' },
  { label: '2 Bulan', value: '2' },
  { label: '3 Bulan', value: '3' },
  { label: '4 Bulan', value: '4' },
  { label: '5 Bulan', value: '5' },
  { label: '6 Bulan', value: '6' },
  { label: '7 Bulan', value: '7' },
  { label: '8 Bulan', value: '8' },
  { label: '9 Bulan', value: '9' },
  { label: '10 Bulan', value: '10' },
  { label: '11 Bulan', value: '11' },
  { label: '12 Bulan', value: '12' },
  { label: '24 Bulan', value: '24' },
  { label: '36 Bulan', value: '36' },
]
