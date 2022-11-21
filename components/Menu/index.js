import Link from 'next/link'
import LogoSmall from '../../public/logo-small.svg'
import Logo from '../../public/logo.svg'

import Icon from '../Icon/Icon-view'

const Menu = () => (
  <div className="fixed left-0 top-0 min-h-full w-[70px] border-r border-r-gray-200  flex flex-col transition-all ease-in-out hover:w-[240px] group overflow-hidden z-10 bg-white hover:shadow-lg">
    <LogoSmall
      className="absolute top-6 left-6 z-20 group-hover:opacity-0"
      width={120}
    />
    <Logo
      className="absolute top-6 left-6 z-20 opacity-0 group-hover:opacity-100"
      width={120}
    />
    <div className="absolute w-[240px] flex flex-1 flex-col pt-28 h-full">
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
      <Link href="/archive" shallow>
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
      </Link>
      <hr className="mb-4" />
      <Link href="/flow" shallow>
        <a className="pl-5 mb-5 flex flex-row items-center text-gray-500 group-one hover:text-purple-800 cursor-pointer">
          <Icon
            name="HiFilter"
            size={30}
            className="text-gray-500 group-one-hover:text-purple-800"
          />
          <span className="ml-5 group-hover:ml-3 transition-all ease-in-out">
            Flow
          </span>
        </a>
      </Link>
      <Link href="/company" shallow>
        <a className="pl-5 mb-5 flex flex-row items-center text-gray-500 group-one hover:text-purple-800 cursor-pointer">
          <Icon
            name="HiOfficeBuilding"
            size={30}
            className="text-gray-500 group-one-hover:text-purple-800"
          />
          <span className="ml-5 group-hover:ml-3 transition-all ease-in-out">
            Company
          </span>
        </a>
      </Link>
      <hr className="mb-4" />
      <Link href="/my-videos" shallow>
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
      </Link>
      <Link href="/profile" shallow>
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
      </Link>
      <div className="flex flex-1" />
      <hr className="mb-4" />

      <Link href="/logout">
        <a className="pl-5 mb-5 flex flex-row items-center text-gray-500 group-one hover:text-purple-800 cursor-pointer">
          <Icon
            name="HiLogout"
            size={30}
            className="text-gray-500 group-one-hover:text-purple-800"
          />
          <span className="ml-5 group-hover:ml-3 transition-all ease-in-out">
            logout
          </span>
        </a>
      </Link>
    </div>
  </div>
)
export default Menu
