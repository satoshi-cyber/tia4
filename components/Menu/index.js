import Link from 'next/link'
import LogoSmall from '../../public/logo-small.svg'
import Logo from '../../public/logo.svg'

import Icon from '../Icon/Icon-view'

const Menu = () => (
  <div className="fixed left-0 top-0 min-h-full w-[70px] border-r border-r-gray-200 pt-28 flex flex-col transition-all ease-in-out hover:w-[240px] group overflow-hidden z-10 bg-white hover:shadow-lg">
    <LogoSmall
      className="absolute top-6 left-6 z-20 group-hover:opacity-0"
      width={120}
    />
    <Logo
      className="absolute top-6 left-6 z-20 opacity-0 group-hover:opacity-100"
      width={120}
    />
    <div className="absolute w-[240px]">
      <Link href="/jobs" shallow>
        <a className="pl-5 mb-5 flex flex-row items-center text-gray-500 group-one hover:text-purple-800 cursor-pointer">
          <Icon
            name="HiPlusCircle"
            size={30}
            className="text-gray-500 group-one-hover:text-purple-800"
          />
          <span className="ml-5 group-hover:ml-3 transition-all ease-in-out">
            Jobs
          </span>
        </a>
      </Link>
      <Link href="/rate" shallow>
        <a className="pl-5 mb-5 flex flex-row items-center text-gray-500 group-one hover:text-purple-800 cursor-pointer">
          <Icon
            name="HiPlay"
            size={30}
            className="text-gray-500 group-one-hover:text-purple-800"
          />
          <span className="ml-5 group-hover:ml-3 transition-all ease-in-out">
            Rate
          </span>
        </a>
      </Link>
      <a className="pl-5 mb-5 flex flex-row items-center text-gray-500 group-one hover:text-purple-800 cursor-pointer">
        <Icon
          name="HiArchive"
          size={30}
          className="text-gray-500 group-one-hover:text-purple-800"
        />
        <span className="ml-5 group-hover:ml-3 transition-all ease-in-out">
          Archive
        </span>
      </a>
      <hr className="mb-4" />
      <a className="pl-5 mb-5 flex flex-row items-center text-gray-500 group-one hover:text-purple-800 cursor-pointer">
        <Icon
          name="HiUserCircle"
          size={30}
          className="text-gray-500 group-one-hover:text-purple-800"
        />
        <span className="ml-5 group-hover:ml-3 transition-all ease-in-out">
          My Videos
        </span>
      </a>
      <hr className="mb-4" />
      <a className="pl-5 mb-5 flex flex-row items-center text-gray-500 group-one hover:text-purple-800 cursor-pointer">
        <Icon
          name="HiUser"
          size={30}
          className="text-gray-500 group-one-hover:text-purple-800"
        />
        <span className="ml-5 group-hover:ml-3 transition-all ease-in-out">
          Profile
        </span>
      </a>
      <a className="pl-5 mb-5 flex flex-row items-center text-gray-500 group-one hover:text-purple-800 cursor-pointer">
        <Icon
          name="HiCog"
          size={30}
          className="text-gray-500 group-one-hover:text-purple-800"
        />
        <span className="ml-5 group-hover:ml-3 transition-all ease-in-out">
          Settings
        </span>
      </a>
    </div>
  </div>
)
export default Menu
