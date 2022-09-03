import React from "react";
import * as Icons from "react-icons/hi";
import { Player } from "video-react";
import "video-react/dist/video-react.css";

import Logo from "../public/logo.svg";
import Linkedin from "../public/linkedin.svg";

const Icon = ({ name, ...props }) => {
  const IconComponent = Icons[name];

  return <IconComponent {...props} />;
};

export default function Home() {
  return (
    <div className="flex flex-1 w-full justify-center items-center ">
      <div className="w-full flex flex-1 h-full flex-col justify-center items-center">
        <div className="fixed left-0 top-0 min-h-full w-[70px] border-r border-r-gray-200 pt-28 flex flex-col transition-all ease-in-out hover:w-[240px] group overflow-hidden z-10 bg-white hover:shadow-lg">
          <Logo className="fixed top-6 left-6 z-20" width={120} />
          <div className="absolute w-[240px]">
            <a className="pl-5 mb-5 flex flex-row items-center text-gray-500 group-one hover:text-purple-800 cursor-pointer">
              <Icon
                name="HiPlusCircle"
                size={30}
                className="text-gray-500 group-one-hover:text-purple-800"
              />
              <span className="ml-5 group-hover:ml-3 transition-all ease-in-out">
                jobs
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
        <div className="flex w-screen pl-[70px] justify-evenly items-center h-28 top-0">
          <div className="flex flex-row h-full w-[600px] items-center justify-between">
            <div>
              <p className="text-xs mb-2 opacity-0">.</p>
              <input type="text" className="w-full" placeholder="search" />
            </div>
            <div>
              <p className="text-xs mb-2">Wached</p>
              <select className="w-full">
                <option>All</option>
                <option>New</option>
                <option>Wached</option>
              </select>
            </div>
            <div>
              <p className="text-xs mb-2">Rate</p>
              <select className="w-full">
                <option>All</option>
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
              </select>
            </div>
          </div>
          <div className="w-[280px]">
            <p className="text-xs mb-2">Job</p>
            <div className="flex flex-1 items-center justifly-center">
              <select className="w-full">
                <option>All jobs</option>
                <option>Jobs / lorem ipsum job</option>
                <option>Jobs / lorem ipsum job</option>
                <option>Jobs / lorem ipsum job</option>
                <option>Jobs / lorem ipsum job</option>
                <option>Jobs / lorem ipsum job</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex flex-1 w-screen pl-[70px] justify-evenly">
          <div className="flex flex-col w-[600px]">
            <Player
              className="flex-none"
              width={600}
              height={400}
              fluid={false}
              playsInline
              autoPlay={true}
              src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
            />
            <div className="flex justify-between mt-4 mb-10">
              <div className="flex">
                <div className="mr-4">
                  <img
                    alt="avatar"
                    src="/avatar.jpeg"
                    width={50}
                    height={50}
                    className="rounded-full border"
                  />
                </div>
                <div>
                  <p className="text-lg">Lorem ipsum</p>
                  <p className="text-xs text-gray-500 max-w-[300px]">
                    Lorem ipsum dolor sit lorem dolor sum dolor sit lorem Lorem
                    ipsum dolor sit lorem dolor sum dolor sit lorem
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Icon name="HiHeart" size={30} className="text-black" />
                <Icon name="HiMail" size={30} className="text-black" />
                <Linkedin width={30} className="mt-1" />
              </div>
            </div>
            <div className="border">
              <iframe
                src="https://docs.google.com/gview?url=http://infolab.stanford.edu/pub/papers/google.pdf&amp;embedded=true"
                width={600}
                height={700}
              ></iframe>
            </div>
          </div>
          <div className="w-[280px] min-h-full bg-red-200"></div>
        </div>
      </div>
    </div>
  );
}
