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
import {
  MenuSidebar,
  SideBarTopEntities,
  SingleMenuEntities,
  SubMenuEntities,
} from './entities'
import PVGLogo from 'public/pvg-logo.png'
import { MENU_LIST } from '@/constants/index'
import Footer from '@/atoms/footer'
import { generateUniqueId } from '@/constants/utils'

const SidebarTop = ({ onClick }: SideBarTopEntities) => (
  <span
    tabIndex={0}
    role="button"
    className="mt-3 flex cursor-pointer items-center justify-center p-3"
    onClick={() => onClick()}
    onKeyDown={() => onClick()}
  >
    <Image src={PVGLogo} alt="PVG Image Logo" className="w-[200px]" />
  </span>
)

const SingleMenuContent = ({ itemMenu, goToPage }: SingleMenuEntities) => {
  const { icon, label, path = '' } = itemMenu

  const { asPath } = useRouter()

  return (
    <MenuItem
      icon={icon}
      onClick={() => goToPage(path)}
      className={`py-1 transition-all duration-300 ease-in-out ${
        asPath.indexOf(path) !== -1
          ? 'rounded-lg bg-[#00ba9b] text-white'
          : 'hover:rounded-lg hover:bg-slate-100'
      }`}
      active={asPath.indexOf(path) !== -1}
    >
      {label}
    </MenuItem>
  )
}

const SubMenuMenuContent = ({ itemMenu, goToPage }: SubMenuEntities) => {
  const { icon, label, items = [] } = itemMenu
  const { asPath } = useRouter()

  const firstPath = asPath.split('/')[1]

  return (
    <SubMenu
      label={label}
      icon={icon}
      defaultOpen={firstPath === label.toLocaleLowerCase()}
    >
      {items?.map((item) => (
        <MenuItem
          key={generateUniqueId(5)}
          onClick={() => goToPage(item.path ?? '')}
          className={`transition-all duration-300 ease-in-out ${
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            asPath.indexOf(item.path!) !== -1
              ? 'bg-[#00ba9b] text-white'
              : 'hover:bg-slate-100'
          }`}
        >
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
      transitionDuration={500}
      rootStyles={{
        [`.ps-submenu-content`]: {
          overflow: 'hidden !important',
        },
        [`.ps-menu-icon`]: {
          color: '#01B89D',
        },
        [`.ps-active`]: {
          backgroundColor: '#eeeee4',
          fontWeight: '600',
        },
      }}
    >
      {listMenus.map((menu) => {
        if (menu.type === 'single-menu') {
          return (
            <SingleMenuContent
              key={generateUniqueId(5)}
              itemMenu={menu}
              goToPage={goToPage}
            />
          )
        }

        return (
          <SubMenuMenuContent
            key={generateUniqueId(5)}
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
    <Sidebar
      breakPoint="lg"
      className="border-r-2 bg-white"
      transitionDuration={1000}
      rootStyles={{ [`.ps-menu-root`]: { fontSize: '0.9rem !important' } }}
    >
      <SidebarTop onClick={collapseSidebar} />
      <div className="flex w-full flex-col">
        <div className="mb-8 h-full flex-1">
          <SidebarContent listMenus={MENU_LIST} />
        </div>
      </div>
      <Footer isFixed />
    </Sidebar>
  )
}

export default OrganismSidebar
