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
    console.log('click here')
    dispatch(onLogout())
    router.push('/auth/login')
  }

  const items: MenuProps['items'] = [
    {
      label: (
        <p className="flex items-center justify-center gap-1">
          <AiOutlineLogout /> Logout
        </p>
      ),
      key: '0',
    },
  ]
  return (
    <header className="flex w-full justify-end bg-white p-2 drop-shadow-lg">
      <Dropdown menu={{ items }} trigger={['click']} className="w-12">
        <a
          role="button"
          tabIndex={0}
          onClick={() => handleLogout()}
          onKeyDown={(e) => e.preventDefault()}
        >
          <Badge>
            <Avatar size="large" src="https://i.pravatar.cc/30" />
          </Badge>
        </a>
      </Dropdown>
    </header>
  )
}

export default TemplatesHeader
