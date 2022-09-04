import { Player } from "video-react";
import React from "react";
import Icon from "../components/Icon";
import Menu from "../components/Menu";
import "video-react/dist/video-react.css";

import Linkedin from "../public/linkedin.svg";

export default function Home() {
  return (
    <div className="flex flex-1 w-full justify-center items-center pt-20">
      <Menu />
      <div className="flex flex-1 w-screen md:pl-[70px] justify-evenly">
        <div className="flex flex-col max-w-[600px] w-full px-8">
          <div className="flex flex-row mb-4 items-center">
            <Icon
              name="HiOutlineBriefcase"
              size={20}
              className="text-black mr-3"
            />
            Senior software developer
          </div>
          <Player
            className="flex-none rounded-2xl shadow-sm overflow-hidden w-full"
            width="100%"
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
                <div className="flex flex-row items-center">
                  <Icon name="HiMail" size={30} className="text-black mr-3" />
                  <Linkedin width={20} />
                </div>
                <p className="text-2xl">Lorem ipsum</p>
                <p className="text-xs text-gray-500 max-w-[300px]">
                  Lorem ipsum dolor sit lorem dolor sum dolor sit lorem Lorem
                  ipsum dolor sit lorem dolor sum dolor sit lorem
                </p>
              </div>
            </div>
            <div className="flex-none">
              <div className="grid grid-cols-2 grid-rows-1 gap-4 border-2 p-2 rounded-full">
                <Icon name="HiThumbDown" size={50} className="text-black" />
                <Icon name="HiThumbUp" size={50} className="text-black" />
              </div>
            </div>
            <Icon name="HiBookmark" size={40} className="text-black" />
          </div>
          <div className="border">
            <iframe
              src="https://docs.google.com/gview?url=http://infolab.stanford.edu/pub/papers/google.pdf&amp;embedded=true"
              width="100%"
              height={700}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
