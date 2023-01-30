import clsx from 'clsx';
import { ControlBar, Player, Shortcut, BigPlayButton } from 'video-react';
import { SwiperSlide, Swiper as SwiperContainer } from 'swiper/react';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-creative';
import 'video-react/dist/video-react.css';
import SkeletonLoader from '../SkeletonLoader';

import { InterviewPlayerProps } from './InterviewPlayer-types';
import { SWIPER_OPTIONS } from './InterviewPlayer-constants';
import { useEffect, useRef, useState } from 'react';

const PlayerWithWidth = Player as any;

const FullScreen: React.FC<{ order: any; onClick: () => void }> = ({
  onClick,
}) => (
  <button className="text-white px-4" onClick={onClick}>
    <svg
      width={20}
      height={20}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
      />
    </svg>
  </button>
);

const InterviewPlayer: React.FC<InterviewPlayerProps> = ({
  answers,
  className,
}) => {
  const players = useRef<any[]>([]);

  const [swiper, setSwiper] = useState<Swiper>();
  const [fullScreen, setFullScreen] = useState(false);

  const onEnded = () => swiper?.slideNext();

  useEffect(() => {
    swiper?.on('slideChange', () => {
      players.current.forEach((player, index) => {
        if (swiper.realIndex === index) {
          return player.video.play();
        }

        player.video.pause();
      });
    });
  }, [swiper]);

  const toggleFullScreen = () => setFullScreen(!fullScreen);

  return (
    <div
      className={clsx(
        fullScreen
          ? 'fixed w-screen h-screen top-0 bottom-0 left-0 right-0 z-50 bg-black'
          : 'w-full h-[400px] md:h-[489px] relative rounded-2xl overflow-hidden bg-black transform-gpu',
        className
      )}
    >
      <SkeletonLoader
        width="100%"
        height="100%"
        after={
          <SwiperContainer
            {...SWIPER_OPTIONS}
            onSwiper={setSwiper}
            className="w-full h-full"
          >
            {answers?.map((answer, i) => (
              <SwiperSlide>
                <div className="flex flex-1 justify-center relative w-full h-full">
                  <div className="absolute z-20 transform-gpu flex flex-col items-center backdrop-blur-2xl bg-black/20 rounded-lg p-3 m-3 md:max-w-[500px]">
                    <p className="text-md text-white text-center pointer-events-none transition-all transform-gpu duration-700">
                      {answer.question.question}
                    </p>
                  </div>
                  <PlayerWithWidth
                    ref={(player: any) => (players.current[i] = player)}
                    dblclickable={false}
                    width="100%"
                    height="100%"
                    className="shadow-sm overflow-hidden z-10"
                    fluid={false}
                    playsInline
                    controls
                    autoPlay
                    src={answer.url}
                    onEnded={onEnded}
                  >
                    <BigPlayButton position="center" />
                    <Shortcut dblclickable={false} />
                    <ControlBar>
                      <FullScreen order={7} onClick={toggleFullScreen} />
                    </ControlBar>
                  </PlayerWithWidth>
                </div>
              </SwiperSlide>
            ))}
          </SwiperContainer>
        }
      />
    </div>
  );
};

export default InterviewPlayer;
