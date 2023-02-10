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
import { hexToRgba, menuClasses, themes } from './utils'
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
    <MenuItem icon={icon} onClick={() => goToPage(path)}>
      {label}
    </MenuItem>
  )
}

const SubMenuMenuContent = ({ itemMenu, goToPage }: SubMenuEntities) => {
  const { icon, label, items = [] } = itemMenu
  return (
    <SubMenu label={label} icon={icon}>
      {items.map((item) => (
        <MenuItem key={nanoid()} onClick={() => goToPage(item.path ?? '')}>
          {' '}
          {item.label}
        </MenuItem>
      ))}
    </SubMenu>
  )
}

const SidebarContent = ({ listMenus, menuItemStyles }: MenuSidebar) => {
  const router = useRouter()

  const goToPage = (path: string) => {
    router.push(path)
  }

  return (
    <Menu
      transitionDuration={500}
      rootStyles={{
        [`.ps-submenu-content`]: {
          overflow: 'hidden !important',
        },
        [`.ps-menu-icon`]: {
          color: '#01B89D',
        },
      }}
      menuItemStyles={menuItemStyles}
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
  const { collapseSidebar, collapsed } = useProSidebar()

  const menuItemStyles = {
    root: {
      fontSize: '12px',
      fontWeight: 400,
    },
    icon: {
      color: '#0098e5',
      [`&.${menuClasses.disabled}`]: {
        color: themes.light.menu.disabled.color,
      },
    },
    SubMenuExpandIcon: {
      color: '#b6b7b9',
    },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? hexToRgba(themes.light.menu.menuContent, !collapsed ? 0.4 : 1)
          : 'transparent',
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: themes.light.menu.disabled.color,
      },
      '&:hover': {
        backgroundColor: hexToRgba(themes.light.menu.hover.backgroundColor, 1),
        color: themes.light.menu.hover.color,
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  }

  return (
    <Sidebar
      breakPoint="lg"
      className="border-r-2 bg-white"
      transitionDuration={1000}
      rootStyles={{ [`.ps-menu-root`]: { fontSize: '0.9rem !important' } }}
    >
      <SidebarTop onClick={collapseSidebar} />
      <div className="w-full flex flex-col">
        <div className="mb-8 h-full flex-1">
          <SidebarContent listMenus={MENU_LIST} menuStyles={menuItemStyles} />
        </div>
      </div>
      <Footer isFixed />
    </Sidebar>
  )
}

export default OrganismSidebar
