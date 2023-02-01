import React from 'react'
import {
  Menu,
  MenuItem,
  Sidebar,
  SubMenu,
  useProSidebar,
} from 'react-pro-sidebar'
import Image from 'next/image'
import { nanoid } from 'nanoid'
import {
  SidebarEntities,
  SideBarTopEntities,
  SingleMenuEntities,
  SubMenuEntities,
} from './entities'
import { MENU_LIST } from '@/constants/index'
import Footer from '@/atoms/footer'

const SidebarTop = ({ onClick }: SideBarTopEntities) => (
  <span
    tabIndex={0}
    role="button"
    className="p-5 mb-3 flex items-center justify-center cursor-pointer"
    onClick={() => onClick()}
    onKeyDown={() => onClick()}
  >
    <Image src="/png-logo.png" alt="Image Logo" width={150} height={100} />
  </span>
)

const SingleMenuContent = ({ itemMenu }: SingleMenuEntities) => {
  const { icon, label } = itemMenu
  return (
    <MenuItem
      icon={icon}
      className="text-m-bold text-neutral hover:bg-[#D2E9F3] hover:rounded-lg px-4"
    >
      {label}
    </MenuItem>
  )
}

const SubMenuMenuContent = ({ itemMenu }: SubMenuEntities) => {
  const { icon, label, items = [] } = itemMenu
  return (
    <SubMenu
      label={label}
      icon={icon}
      className="text-m-bold text-neutral hover:bg-[#D2E9F3] hover:rounded-sm px-4"
    >
      {items.map((item) => (
        <MenuItem key={nanoid()}> {item.label}</MenuItem>
      ))}
    </SubMenu>
  )
}

const SidebarContent = ({ listMenus }: SidebarEntities) => (
  <Menu>
    {listMenus.map((menu) => {
      if (menu.type === 'single-menu') {
        return <SingleMenuContent key={nanoid()} itemMenu={menu} />
      }

      return <SubMenuMenuContent key={nanoid()} itemMenu={menu} />
    })}
  </Menu>
)

const OrganismSidebar = () => {
  const { collapseSidebar } = useProSidebar()

  return (
    <Sidebar breakPoint="lg" className="bg-white border-r-2">
      <SidebarTop onClick={collapseSidebar} />
      <div className="flex flex-col w-full">
        <div className="flex-1 mb-8 h-full">
          <SidebarContent listMenus={MENU_LIST} />
        </div>
      </div>
      <Footer isFixed />
    </Sidebar>
  )
}

export default OrganismSidebar
