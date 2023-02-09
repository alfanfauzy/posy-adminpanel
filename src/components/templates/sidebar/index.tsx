import React from 'react'
import {
  Menu,
  MenuItem,
  Sidebar,
  SubMenu,
  useProSidebar,
} from 'react-pro-sidebar'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { nanoid } from 'nanoid'
import {
  MenuSidebar,
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
    className="mb-3 flex cursor-pointer items-center justify-center p-5"
    onClick={() => onClick()}
    onKeyDown={() => onClick()}
  >
    <Image src="/pvg-logo.png" alt="Image Logo" width={150} height={100} />
  </span>
)

const SingleMenuContent = ({ itemMenu, goToPage }: SingleMenuEntities) => {
  const { icon, label, path = '' } = itemMenu
  return (
    <MenuItem
      icon={icon}
      className="text-neutral px-4 text-m-bold hover:bg-[#ebebeb]"
      onClick={() => goToPage(path)}
    >
      {label}
    </MenuItem>
  )
}

const SubMenuMenuContent = ({ itemMenu, goToPage }: SubMenuEntities) => {
  const { icon, label, items = [] } = itemMenu
  return (
    <SubMenu
      label={label}
      icon={icon}
      className="text-neutral px-4 text-m-bold hover:bg-[#ebebeb]"
    >
      {items.map((item) => (
        <MenuItem key={nanoid()} onClick={() => goToPage(item.path ?? '')}>
          {' '}
          {item.label}
        </MenuItem>
      ))}
    </SubMenu>
  )
}

const SidebarContent = ({ listMenus }: MenuSidebar) => {
  const router = useRouter()

  const goToPage = (path: string) => {
    router.push(path)
  }

  return (
    <Menu
      transitionDuration={1000}
      rootStyles={{
        [`.ps-menu-icon`]: {
          backgroundColor: '#e1e1e1',
          color: '#344cff',
        },
      }}
    >
      {listMenus.map((menu) => {
        if (menu.type === 'single-menu') {
          return (
            <SingleMenuContent
              key={nanoid()}
              itemMenu={menu}
              goToPage={goToPage}
            />
          )
        }

        return (
          <SubMenuMenuContent
            key={nanoid()}
            itemMenu={menu}
            goToPage={goToPage}
          />
        )
      })}
    </Menu>
  )
}

const OrganismSidebar = () => {
  const { collapseSidebar } = useProSidebar()

  return (
    <Sidebar breakPoint="lg" className="border-r-2 bg-white">
      <SidebarTop onClick={collapseSidebar} />
      <div className="w-full flex flex-col">
        <div className="mb-8 h-full flex-1">
          <SidebarContent listMenus={MENU_LIST} />
        </div>
      </div>
      <Footer isFixed />
    </Sidebar>
  )
}

export default OrganismSidebar
