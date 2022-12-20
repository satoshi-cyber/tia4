import { useUser } from '@/hooks'
import Avatar from 'react-avatar'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Profile } from './components'

import LogoSmall from '../../public/logo-small.svg'
import LogoText from '../../public/logo-text.svg'
import Logo from '../../public/logo.svg'
import Icon from '../Icon/Icon-view'
import ActiveLink from '../ActiveLink'

const Menu = () => {
  const { asPath } = useRouter()
  const { hasCompany } = useUser()

  // TODO: fix with app dir update
  if (asPath.includes('/login')) return null
  if (asPath.includes('/record/')) return null
  if (asPath.includes('/oauth-callback')) return null

  return (
    <>
      <div className="bg-white md:hidden fixed w-full p-4 border-b border-gray">
        <Logo width={120} />
      </div>
      <div className="fixed left-0 top-0 min-h-full w-[70px] shadow-pixel flex flex-col transition-all hover:w-[240px] group overflow-hidden z-20 bg-white hover:shadow-pixelHover hidden md:flex">
        <Link href="/">
          <LogoSmall className="absolute top-6 left-6 z-20" width={120} />
          <LogoText
            className="transition-all absolute top-6 left-6 z-20 left-[70px] group-hover:left-[24px]"
            width={120}
          />
        </Link>
        <div className="w-full flex flex-1 flex-col pt-28 h-full">
          {hasCompany ? (
            <>
              <ActiveLink href="/jobs" shallow>
                <a className="pl-5 py-1 mb-3 flex flex-row items-center text-gray-500 group/link hover:text-gray-800 cursor-pointer transition-all border-r-2 border-r-transparent data-[active=true]:border-purple-800">
                  <Icon
                    name="HiPlusCircle"
                    size={30}
                    className="group-data-[active=true]/link:text-purple-800 group-data-[active=true]/link:text-purple-800 text-gray-500 group-hover/link:text-purple-800"
                  />
                  <span className="ml-5 transition-all absolute w-[240px] left-[69px] group-hover:left-[40px]">
                    Jobs
                  </span>
                </a>
              </ActiveLink>
              <ActiveLink href="/rate" shallow>
                <a className="pl-5 py-1 mb-3 flex flex-row items-center text-gray-500 group/link hover:text-gray-800 cursor-pointer transition-all border-r-2 border-r-transparent data-[active=true]:border-purple-800">
                  <Icon
                    name="HiPlay"
                    size={30}
                    className="group-data-[active=true]/link:text-purple-800 text-gray-500 group-hover/link:text-purple-800"
                  />
                  <span className="ml-5 transition-all absolute w-[240px] left-[69px] group-hover:left-[40px]">
                    Rate
                  </span>
                </a>
              </ActiveLink>
              <ActiveLink href="/archive" shallow>
                <a className="pl-5 py-1 mb-3 flex flex-row items-center text-gray-500 group/link hover:text-gray-800 cursor-pointer transition-all border-r-2 border-r-transparent data-[active=true]:border-purple-800">
                  <Icon
                    name="HiArchive"
                    size={30}
                    className="group-data-[active=true]/link:text-purple-800 text-gray-500 group-hover/link:text-purple-800"
                  />
                  <span className="ml-5 transition-all absolute w-[240px] left-[69px] group-hover:left-[40px]">
                    Archive
                  </span>
                </a>
              </ActiveLink>
              <ActiveLink href="/flow" shallow>
                <a className="pl-5 py-1 mb-3 flex flex-row items-center text-gray-500 group/link hover:text-gray-800 cursor-pointer transition-all border-r-2 border-r-transparent data-[active=true]:border-purple-800">
                  <Icon
                    name="HiFilter"
                    size={30}
                    className="group-data-[active=true]/link:text-purple-800 text-gray-500 group-hover/link:text-purple-800"
                  />
                  <span className="ml-5 transition-all absolute w-[240px] left-[69px] group-hover:left-[40px]">
                    Flow
                  </span>
                </a>
              </ActiveLink>
              <ActiveLink href="/company" shallow>
                <a className="pl-5 py-1 mb-3 flex flex-row items-center text-gray-500 group/link hover:text-gray-800 cursor-pointer transition-all border-r-2 border-r-transparent data-[active=true]:border-purple-800">
                  <Icon
                    name="HiOfficeBuilding"
                    size={30}
                    className="group-data-[active=true]/link:text-purple-800 text-gray-500 group-hover/link:text-purple-800 flex-none transition-all"
                  />
                  <span className="ml-5 transition-all absolute w-[190px] left-[69px] group-hover:left-[40px] flex flex-row items-center">
                    <span className="flex flex-1">Lorem LLC</span>
                    {/* <button className="border-l mx-4 p-2 text-gray-500 hover:text-purple-800">
                    <Icon name="HiSwitchVertical" size={16} />
                  </button> */}
                  </span>
                </a>
              </ActiveLink>
            </>
          ) : (
            <ActiveLink href="/setup-company" shallow>
              <a className="pl-5 py-1 mb-3 flex flex-row items-center text-gray-500 group/link hover:text-gray-800 cursor-pointer transition-all border-r-2 border-r-transparent data-[active=true]:border-purple-800">
                <Icon
                  name="HiBriefcase"
                  size={30}
                  className="group-data-[active=true]/link:text-purple-800 text-gray-500 group-hover/link:text-purple-800 flex-none transition-all"
                />
                <span className="ml-5 transition-all absolute w-[240px] left-[69px] group-hover:left-[40px]">
                  Post a job
                </span>
              </a>
            </ActiveLink>
          )}
          <hr className="mb-4" />
          <ActiveLink href="/my-videos" shallow>
            <a className="pl-5 py-1 mb-3 flex flex-row items-center text-gray-500 group/link hover:text-gray-800 cursor-pointer transition-all border-r-2 border-r-transparent data-[active=true]:border-purple-800">
              <Icon
                name="HiUserCircle"
                size={30}
                className="group-data-[active=true]/link:text-purple-800 text-gray-500 group-hover/link:text-purple-800 flex-none transition-all"
              />
              <span className="ml-5 transition-all absolute w-[240px] left-[69px] group-hover:left-[40px]">
                My Videos
              </span>
            </a>
          </ActiveLink>
          <ActiveLink href="/record-an-interview" shallow>
            <a className="pl-5 py-1 mb-3 flex flex-row items-center text-gray-500 group/link hover:text-gray-800 cursor-pointer transition-all border-r-2 border-r-transparent data-[active=true]:border-purple-800">
              <Icon
                name="HiVideoCamera"
                size={30}
                className="group-data-[active=true]/link:text-purple-800 text-gray-500 group-hover/link:text-purple-800 flex-none transition-all"
              />
              <span className="ml-5 transition-all absolute w-[240px] left-[69px] group-hover:left-[40px]">
                Record
              </span>
            </a>
          </ActiveLink>
          <ActiveLink href="/info" shallow>
            <a className="pl-5 py-1 mb-3 flex flex-row items-center text-gray-500 group/link hover:text-gray-800 cursor-pointer transition-all border-r-2 border-r-transparent data-[active=true]:border-purple-800">
              <Icon
                name="HiInformationCircle"
                size={30}
                className="group-data-[active=true]/link:text-purple-800 text-gray-500 group-hover/link:text-purple-800 flex-none transition-all"
              />
              <span className="ml-5 transition-all absolute w-[240px] left-[69px] group-hover:left-[40px]">
                Help and support
              </span>
            </a>
          </ActiveLink>
          <div className="flex flex-1" />
          <Profile />
        </div>
      </div>
    </>
  )
}

export default Menu
