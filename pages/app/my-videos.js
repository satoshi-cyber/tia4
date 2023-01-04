import Avatar from 'react-avatar';
import { withAuth } from '@/hocs';
import { Player, ControlBar } from 'video-react';
import 'video-react/dist/video-react.css';

import { Text, Icon } from '../../components';

const MyVideos = () => {
  return (
    <div className="flex flex-1 flex-col w-full items-center py-28 md:py-16 md:pl-[70px]">
      <div className="flex flex-col max-w-[600px] w-full px-4 items-center">
        <div className="mb-20 flex flex-col w-full items-center">
          <Text
            text="My videos"
            className="text-3xl flex-1 text-center ml-[30px] mb-3"
          />
          <Text
            className="text-lg text-gray-500 mb-3"
            text="Watch and delete your videos!"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <div>
            <Player
              className="flex-none rounded-xl shadow-sm overflow-hidden w-full h-[300px] md:h-[200px]"
              width="100%"
              fluid={false}
              controls={false}
              muted
              light={true}
              autoPlay
              loop
              src="https://www.shutterstock.com/shutterstock/videos/1080282788/preview/stock-footage-asia-woman-micro-influencer-record-live-viral-video-camera-at-home-studio-happy-youtuber-fun-talk.webm"
            >
              <ControlBar
                autoHide={false}
                disableDefaultControls={true}
                className="hidden"
              ></ControlBar>
            </Player>
            <div className="flex justify-between mt-4 mb-4 md:mb-10">
              <div className="flex">
                <div className="mr-4">
                  <Avatar name="Lorem LLC" size={40} round />
                </div>
                <div>
                  <p className="text-lg">Lorem LLC</p>
                  <div>
                    <p className="text-xs mb-2">02/03/2021</p>
                  </div>
                </div>
              </div>
              <Icon name="HiTrash" size={30} className="text-black" />
            </div>
          </div>
          <div>
            <Player
              className="flex-none rounded-xl shadow-sm overflow-hidden w-full h-[300px] md:h-[200px]"
              width="100%"
              fluid={false}
              controls={false}
              muted
              light={true}
              autoPlay
              loop
              src="https://www.shutterstock.com/shutterstock/videos/1080282788/preview/stock-footage-asia-woman-micro-influencer-record-live-viral-video-camera-at-home-studio-happy-youtuber-fun-talk.webm"
            >
              <ControlBar
                autoHide={false}
                disableDefaultControls={true}
                className="hidden"
              ></ControlBar>
            </Player>
            <div className="flex justify-between mt-4 mb-4 md:mb-10">
              <div className="flex">
                <div className="mr-4">
                  <Avatar src="/twiter.png" size={40} round />
                </div>
                <div>
                  <p className="text-lg">Twiter</p>
                  <div>
                    <p className="text-xs mb-2">02/06/2021</p>
                  </div>
                </div>
              </div>
              <Icon name="HiTrash" size={30} className="text-black" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(MyVideos);
