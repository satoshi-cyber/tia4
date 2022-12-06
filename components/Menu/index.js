import Link from 'next/link'
import Avatar from 'react-avatar'
import LogoSmall from '../../public/logo-small.svg'
import Logo from '../../public/logo.svg'

import Icon from '../Icon/Icon-view'

const Menu = () => (
  <div className="fixed left-0 top-0 min-h-full w-[70px] border-r border-r-gray-200  flex flex-col transition-all ease-in-out hover:w-[240px] group overflow-hidden z-20 bg-white hover:shadow-lg">
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
        <a className="pl-5 mb-5 flex flex-row items-center text-gray-500 group-one hover:text-gray-800 cursor-pointer">
          <Avatar src="/twiter.png" size={30} round />
          <span className="ml-5 group-hover:ml-3 transition-all ease-in-out flex-1">
            Lorem LLC
          </span>
          <a className="border-l rounded-full mr-2 p-2 text-gray-500 hover:text-purple-800">
            <Icon name="HiSwitchVertical" size={14} />
          </a>
        </a>
      </Link>
      {/* <Link href="/setup-company" shallow>
        <a className="pl-5 mb-5 flex flex-row items-center text-gray-500 group-one hover:text-purple-800 cursor-pointer">
          <Icon
            name="HiBriefcase"
            size={30}
            className="text-gray-500 group-one-hover:text-purple-800"
          />
          <span className="ml-5 group-hover:ml-3 transition-all ease-in-out">
            Post a job
          </span>
        </a>
      </Link> */}
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
      <Link href="/record-an-interview" shallow>
        <a className="pl-5 mb-5 flex flex-row items-center text-gray-500 group-one hover:text-purple-800 cursor-pointer">
          <Icon
            name="HiVideoCamera"
            size={30}
            className="text-gray-500 group-one-hover:text-purple-800"
          />
          <span className="ml-5 group-hover:ml-3 transition-all ease-in-out">
            Record
          </span>
        </a>
      </Link>
      <Link href="/info" shallow>
        <a className="pl-5 mb-5 flex flex-row items-center text-gray-500 group-one hover:text-purple-800 cursor-pointer">
          <Icon
            name="HiInformationCircle"
            size={30}
            className="text-gray-500 group-one-hover:text-purple-800"
          />
          <span className="ml-5 group-hover:ml-3 transition-all ease-in-out">
            Help and support
          </span>
        </a>
      </Link>
      <div className="flex flex-1" />

      <Link href="/profile">
        <a className="pl-5 mb-5 flex flex-row items-center text-gray-500 group-one hover:text-gray-800 cursor-pointer">
          <Avatar name="Lorem ipsum" size={30} round />
          <span className="ml-5 group-hover:ml-3 transition-all ease-in-out flex-1">
            Lorem ipsum
          </span>
          <a className="border-l rounded-full mx-2 p-2 text-gray-500 hover:text-purple-800">
            <Icon name="HiOutlineLogout" size={14} />
          </a>
        </a>
      </Link>
    </div>
  </div>
)
export default Menu
