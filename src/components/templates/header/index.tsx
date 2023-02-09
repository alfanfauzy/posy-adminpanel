import { Avatar, Badge, Dropdown, MenuProps } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import { AiOutlineLogout } from 'react-icons/ai'

const TemplatesHeader = () => {
  const router = useRouter()

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
    <header className="w-full flex justify-end bg-white p-2 drop-shadow-lg">
      <Dropdown menu={{ items }} trigger={['click']} className="w-12">
        <a
          role="button"
          tabIndex={0}
          onClick={() => router.push('/auth-login')}
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
