import { Avatar, Badge, Dropdown, MenuProps } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { useDispatchApp } from 'store/hooks'
import { onLogout } from 'store/slice/auth'

const TemplatesHeader = () => {
  const router = useRouter()
  const dispatch = useDispatchApp()

  const handleLogout = () => {
    dispatch(onLogout())
    router.push('/auth/login')
  }

  const items: MenuProps['items'] = [
    {
      label: (
        <a
          tabIndex={0}
          role="button"
          className="flex items-center justify-center gap-1 rounded-lg border border-gray-200 bg-red-700 p-2 text-l-medium text-white hover:text-white"
          onClick={() => handleLogout()}
          onKeyDown={() => handleLogout()}
        >
          <AiOutlineLogout /> Logout
        </a>
      ),
      key: '0',
    },
  ]
  return (
    <header className="flex w-full justify-end bg-white p-2 drop-shadow-lg">
      <Dropdown menu={{ items }} trigger={['hover']} className="w-12">
        <a role="button" tabIndex={0} onKeyDown={(e) => e.preventDefault()}>
          <Badge>
            <Avatar size="large" src="https://i.pravatar.cc/30" />
          </Badge>
        </a>
      </Dropdown>
    </header>
  )
}

export default TemplatesHeader
