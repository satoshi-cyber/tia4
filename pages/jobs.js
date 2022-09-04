import React from "react";
import Menu from "../components/Menu";
import Icon from "../components/Icon";
import "video-react/dist/video-react.css";

export default function Jobs() {
  return (
    <div className="flex flex-1 w-full justify-center py-28 md:py-16">
      <Menu />
      <div className="flex flex-1 w-screen md:pl-[70px] justify-evenly">
        <div className="flex flex-col max-w-[600px] w-full px-4">
          <div className="flex flex-col items-center ">
            <p className="text-3xl mb-2">Get more interviews Today!</p>
            <p className="text-lg text-gray-500 mb-10">Get better candidates</p>
            <div className="flex flex-row items-center mb-20">
              <button className="flex flex-row rounded-full items-center p-2 pr-4 bg-gradient-to-r from-purple-500 bg-purple-800">
                <Icon
                  name="HiPlusCircle"
                  size={30}
                  className="mr-2 text-white"
                />
                <p className="text-lg text-white">Create new job</p>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex w-full flex-row justify-between items-center border p-4 rounded-lg shadow-sm">
              <div>
                <p className="text-2xl mb-2">Lorem job</p>
                <p className="text-xs">Deadline: 11/12/2023</p>
              </div>
              <div className="grid grid-cols-2 gap-4 ml-4">
                <Icon name="HiPencil" size={30} className="text-black" />
                <Icon name="HiLink" size={30} className="text-black" />
              </div>
            </div>
            <div className="flex w-full flex-row justify-between items-center border p-4 rounded-lg shadow-sm">
              <div>
                <p className="text-2xl mb-2">Lorem job</p>
                <p className="text-xs">Deadline: 11/12/2023</p>
              </div>
              <div className="grid grid-cols-2 gap-4 ml-4">
                <Icon name="HiPencil" size={30} className="text-black" />
                <Icon name="HiLink" size={30} className="text-black" />
              </div>
            </div>
            <div className="flex w-full flex-row justify-between items-center border p-4 rounded-lg shadow-sm">
              <div>
                <p className="text-2xl mb-2">Lorem job</p>
                <p className="text-xs">Deadline: 11/12/2023</p>
              </div>
              <div className="grid grid-cols-2 gap-4 ml-4">
                <Icon name="HiPencil" size={30} className="text-black" />
                <Icon name="HiLink" size={30} className="text-black" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
