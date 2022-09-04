import Link from "next/link";
import { useState } from "react";

import LogoSmall from "../../public/logo-small.svg";
import Logo from "../../public/logo.svg";
import LogoMobile from "../../public/logo-mobile.svg";

import Icon from "../Icon";

const Items = () => (
  <>
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
  </>
);

const Menu = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  return (
    <>
      <div className="absolute top-6 left-0 block md:hidden flex flex-ro items-center">
        <a onClick={toggle} className="cursor-pointer ml-5">
          <Icon name="HiMenu" size={30} className="text-gray-500 mr-4 " />
        </a>
        <LogoMobile className="" width={120} />
      </div>
      {open && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-white z-20 md:hidden">
          <div className="flex flex-ro items-center mt-6 mb-12">
            <a onClick={toggle} className="cursor-pointer ml-5">
              <Icon name="HiMenu" size={30} className="text-gray-500 mr-4 " />
            </a>
            <LogoMobile className="" width={120} />
          </div>
          <Items />
        </div>
      )}
      <div className="fixed left-0 top-0 min-h-full w-[70px] border-r border-r-gray-200 pt-28 flex flex-col transition-all ease-in-out hover:w-[240px] group overflow-hidden z-10 bg-white hover:shadow-lg hidden md:block">
        <LogoSmall
          className="absolute top-6 left-6 z-20 group-hover:opacity-0"
          width={120}
        />
        <Logo
          className="absolute top-6 left-6 z-20 opacity-0 group-hover:opacity-100"
          width={120}
        />
        <div className="absolute w-[240px]">
          <Items />
        </div>
      </div>
    </>
  );
};
export default Menu;
