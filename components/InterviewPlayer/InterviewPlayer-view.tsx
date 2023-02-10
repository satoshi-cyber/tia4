import { Swiper as SwiperContainer, SwiperSlide } from 'swiper/react';
import { FullScreen } from 'react-full-screen';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-creative';

import { InterviewPlayerProps } from './InterviewPlayer-types';
import { SKELETON_PROPS, SWIPER_OPTIONS } from './InterviewPlayer-constants';
import { useInterviewPlayer } from './InterviewPlayer-hook';
import Slide from './components/Slide';

import SkeletonLoader from '../SkeletonLoader';

const InterviewPlayer: React.FC<InterviewPlayerProps> = ({
  answers,
  className,
}) => {
  const {
    handle,
    classNames,
    players,
    setSwiper,
    onEnded,
    fullScreen,
    toggleFullScreen,
  } = useInterviewPlayer({
    className,
  });

  return (
    <div className={classNames.container}>
      <FullScreen handle={handle}>
        <div className="absolute w-full h-full min-h-[400px] md:min-h-[482px]">
          <SkeletonLoader
            {...SKELETON_PROPS}
            after={
              <SwiperContainer
                {...SWIPER_OPTIONS}
                onSwiper={setSwiper}
                className={classNames.swiper}
              >
                {answers?.map((answer, index) => (
                  <SwiperSlide key={index}>
                    <Slide
                      answer={answer}
                      index={index}
                      players={players}
                      onEnded={onEnded}
                      fullScreen={fullScreen}
                      toggleFullScreen={toggleFullScreen}
                    />
                  </SwiperSlide>
                ))}
              </SwiperContainer>
            }
          />
        </div>
      </FullScreen>
    </div>
  );
};

export default InterviewPlayer;
