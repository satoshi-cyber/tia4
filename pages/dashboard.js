import React from "react";
import * as Icons from "react-icons/hi";
import { Player } from "video-react";
import "video-react/dist/video-react.css";

import Logo from "../public/logo.svg";

const Icon = ({ name, ...props }) => {
  const IconComponent = Icons[name];

  return <IconComponent {...props} />;
};

export default function Home() {
  return (
    <div className="flex flex-1 w-full justify-center items-center py-20">
      <div className="w-full flex flex-1 h-full flex-col justify-center items-center">
        <Logo className="absolute top-6 left-6 z-20" width={120} />
        <div className="absolute left-0 top-0 h-full w-[70px] border-r border-r-gray-200 pt-28 flex flex-col transition-all ease-in-out hover:w-[240px] group overflow-hidden z-10 bg-white hover:shadow-lg">
          <div className="absolute w-[240px]">
            <a className="pl-5 mb-5 flex flex-row items-center text-gray-500 group-one hover:text-purple-800 cursor-pointer">
              <Icon
                name="HiPlusCircle"
                size={30}
                className="text-gray-500 group-one-hover:text-purple-800"
              />
              <span className="ml-5 group-hover:ml-3 transition-all ease-in-out">
                Add a job / jobs
              </span>
            </a>
            <a className="pl-5 mb-5 flex flex-row items-center text-gray-500 group-one hover:text-purple-800 cursor-pointer">
              <Icon
                name="HiPlay"
                size={30}
                className="text-gray-500 group-one-hover:text-purple-800"
              />
              <span className="ml-5 group-hover:ml-3 transition-all ease-in-out">
                Interviews
              </span>
            </a>
            <hr className="mb-4" />
            <a className="pl-5 mb-5 flex flex-row items-center text-gray-500 group-one hover:text-purple-800 cursor-pointer">
              <Icon
                name="HiArchive"
                size={30}
                className="text-gray-500 group-one-hover:text-purple-800"
              />
              <span className="ml-5 group-hover:ml-3 transition-all ease-in-out">
                My Drafts
              </span>
            </a>
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
          </div>
        </div>
        <div className="flex flex-1 w-full h-full  pl-[70px] justify-evenly">
          <div>
            <Player
              width={600}
              fluid={false}
              playsInline
              aut
              src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
            />
          </div>
          <div className="w-[280px] bg-red-600 h-80"></div>
        </div>
      </div>
    </div>
  );
}
