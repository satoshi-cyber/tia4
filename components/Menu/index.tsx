import { useUser } from '@/hooks'
import Link from 'next/link'
import Avatar from 'react-avatar'

import { Profile } from './components'

import LogoSmall from '../../public/logo-small.svg'
import Logo from '../../public/logo.svg'
import Icon from '../Icon/Icon-view'

const Menu = () => {
  const { hasCompany } = useUser()

  return (
    <div className="fixed left-0 top-0 min-h-full w-[70px] shadow-pixel flex flex-col transition-all ease-in-out hover:w-[240px] group overflow-hidden z-20 bg-white hover:shadow-pixelHover">
      <LogoSmall
        className="absolute top-6 left-6 z-20 group-hover:opacity-0"
        width={120}
      />
      <Logo
        className="absolute top-6 left-6 z-20 opacity-0 group-hover:opacity-100"
        width={120}
      />
      <div className="w-full flex flex-1 flex-col pt-28 h-full">
        {hasCompany ? (
          <>
            <Link href="/jobs" shallow>
              <a className="pl-5 py-1 mb-3 flex flex-row items-center text-gray-500 group-one hover:text-gray-800 cursor-pointer transition-all ease-in-out border-r-2 border-purple-800">
                <Icon
                  name="HiPlusCircle"
                  size={30}
                  className="text-gray-500 group-one-hover:text-purple-800"
                />
                <span className="ml-5 transition-all ease-in-out absolute w-[240px] left-[69px] group-hover:left-[40px]">
                  Jobs
                </span>
              </a>
            </Link>
            <Link href="/rate" shallow>
              <a className="pl-5 py-1 mb-3 flex flex-row items-center text-gray-500 group-one hover:text-gray-800 cursor-pointer transition-all ease-in-out">
                <Icon
                  name="HiPlay"
                  size={30}
                  className="text-gray-500 group-one-hover:text-purple-800"
                />
                <span className="ml-5 transition-all ease-in-out absolute w-[240px] left-[69px] group-hover:left-[40px]">
                  Rate
                </span>
              </a>
            </Link>
            <Link href="/archive" shallow>
              <a className="pl-5 py-1 mb-3 flex flex-row items-center text-gray-500 group-one hover:text-gray-800 cursor-pointer transition-all ease-in-out">
                <Icon
                  name="HiArchive"
                  size={30}
                  className="text-gray-500 group-one-hover:text-purple-800"
                />
                <span className="ml-5 transition-all ease-in-out absolute w-[240px] left-[69px] group-hover:left-[40px]">
                  Archive
                </span>
              </a>
            </Link>
            <Link href="/flow" shallow>
              <a className="pl-5 py-1 mb-3 flex flex-row items-center text-gray-500 group-one hover:text-gray-800 cursor-pointer transition-all ease-in-out ">
                <Icon
                  name="HiFilter"
                  size={30}
                  className="text-gray-500 group-one-hover:text-purple-800"
                />
                <span className="ml-5 transition-all ease-in-out absolute w-[240px] left-[69px] group-hover:left-[40px]">
                  Flow
                </span>
              </a>
            </Link>
            <Link href="/company" shallow>
              <a className="pl-5 py-2 mb-3 flex flex-row items-center text-gray-500 group-one hover:text-gray-800 cursor-pointer transition-all ease-in-out">
                <Avatar src="/twiter.png" size="30" round />
                <span className="ml-5 transition-all ease-in-out absolute w-[190px] left-[69px] group-hover:left-[40px] flex flex-row items-center">
                  <span className="flex flex-1">Lorem LLC</span>
                  <button className="border-l mx-4 p-2 text-gray-500 hover:text-purple-800">
                    <Icon name="HiSwitchVertical" size={16} />
                  </button>
                </span>
              </a>
            </Link>
          </>
        ) : (
          <Link href="/setup-company" shallow>
            <a className="pl-5 mb-3 py-2 flex flex-row items-center text-gray-500 group-one hover:text-purple-800 cursor-pointer relative border-r-2 border-r-purple-800">
              <Icon
                name="HiBriefcase"
                size={30}
                className="text-gray-500 group-one-hover:text-purple-800 flex-none transition-all ease-in-out"
              />
              <span className="ml-5 transition-all ease-in-out absolute w-[240px] left-[69px] group-hover:left-[40px]">
                Post a job
              </span>
            </a>
          </Link>
        )}
        <hr className="mb-4" />
        <Link href="/my-videos" shallow>
          <a className="pl-5 mb-5 flex flex-row items-center text-gray-500 group-one hover:text-purple-800 cursor-pointer transition-all ease-in-out">
            <Icon
              name="HiUserCircle"
              size={30}
              className="text-gray-500 group-one-hover:text-purple-800 flex-none transition-all ease-in-out"
            />
            <span className="ml-5 transition-all ease-in-out absolute w-[240px] left-[69px] group-hover:left-[40px]">
              My Videos
            </span>
          </a>
        </Link>
        <Link href="/record-an-interview" shallow>
          <a className="pl-5 mb-5 flex flex-row items-center text-gray-500 group-one hover:text-purple-800 cursor-pointer transition-all ease-in-out">
            <Icon
              name="HiVideoCamera"
              size={30}
              className="text-gray-500 group-one-hover:text-purple-800 flex-none transition-all ease-in-out"
            />
            <span className="ml-5 transition-all ease-in-out absolute w-[240px] left-[69px] group-hover:left-[40px]">
              Record
            </span>
          </a>
        </Link>
        <Link href="/info" shallow>
          <a className="pl-5 mb-5 flex flex-row items-center text-gray-500 group-one hover:text-purple-800 cursor-pointer  transition-all ease-in-out">
            <Icon
              name="HiInformationCircle"
              size={30}
              className="text-gray-500 group-one-hover:text-purple-800 flex-none transition-all ease-in-out"
            />
            <span className="ml-5 transition-all ease-in-out absolute w-[240px] left-[69px] group-hover:left-[40px]">
              Help and support
            </span>
          </a>
        </Link>
        <div className="flex flex-1" />
        <Profile />
      </div>
    </div>
  )
}

export default Menu
