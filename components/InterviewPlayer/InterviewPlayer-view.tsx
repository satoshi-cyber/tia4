import { Swiper as SwiperContainer, SwiperSlide } from 'swiper/react';
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
  );
};

export default InterviewPlayer;
