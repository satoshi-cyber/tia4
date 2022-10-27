import { ButtonIcon, Title } from '@/components'
import { Menu } from '@headlessui/react'
import NoSSR from '@mpth/react-no-ssr'
import { useWatch } from 'react-hook-form'

import { TITLE } from './Header-constants'
import { HeaderProps } from './Header-types'

export const Header: React.FC<HeaderProps> = ({ editJob, handleDeleteJob }) => {
  const jobTitle = useWatch({ name: 'title' })

  const title = editJob ? `Edit ${jobTitle}!` : TITLE.ADD_JOB

  return (
    <div className="flex flex-row w-full justify-between items-center">
      <Title title={title} skeletonProps={{ width: 200 }} className="w-full" />
      {editJob && (
        <NoSSR>
          <Menu as="div" className="relative inline-block text-left mb-8">
            <Menu.Button>
              {({ open }) => (
                <ButtonIcon
                  name="HiCog"
                  size={30}
                  className={`${
                    open
                      ? 'text-purple-800'
                      : 'text-gray-600 hover:text-black transition-all ease-in-out'
                  } active:text-purple-800 `}
                />
              )}
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={`${
                      active && 'text-red-800'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer transition-all ease-in-out`}
                    onClick={handleDeleteJob}
                  >
                    Delete job
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </NoSSR>
      )}
    </div>
  )
}

export default Header
