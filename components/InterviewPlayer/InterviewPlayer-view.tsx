import clsx from 'clsx';
import { Player } from 'video-react';
import { SwiperSlide, Swiper as SwiperContainer } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-creative';
import 'video-react/dist/video-react.css';
import SkeletonLoader from '../SkeletonLoader';

import { InterviewPlayerProps } from './InterviewPlayer-types';
import { SWIPER_OPTIONS } from './InterviewPlayer-constants';

const PlayerWithWidth = Player as any;

const InterviewPlayer: React.FC<InterviewPlayerProps> = ({
  answers,
  className,
}) => (
  <div className={clsx('w-full h-[300px] md:h-[400px] relative', className)}>
    <SkeletonLoader
      width="100%"
      height="100%"
      after={
        <SwiperContainer {...SWIPER_OPTIONS} height={400}>
          {answers?.map((answer) => (
            <SwiperSlide>
              <PlayerWithWidth
                width="100%"
                height="100%"
                className="rounded-2xl shadow-sm overflow-hidden z-10"
                fluid={false}
                playsInline
                controls
                autoPlay
                src={answer.url}
              />
            </SwiperSlide>
          ))}
        </SwiperContainer>
      }
    />
  </div>
);

export default InterviewPlayer;
