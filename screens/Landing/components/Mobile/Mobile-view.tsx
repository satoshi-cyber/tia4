import { FC, useLayoutEffect, useRef } from 'react';
import { SwiperSlide, Swiper as SwiperContainer } from 'swiper/react';
import Swiper, { Controller, EffectFade } from 'swiper';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { HiArrowLeft } from '@react-icons/all-files/hi/HiArrowLeft';
import { HiArrowRight } from '@react-icons/all-files/hi/HiArrowRight';

import Phone from '../../../../public/images/phone.svg';

interface Slide {
  title: string;
  description: string;
  src: string;
}

const SLIDES: Slide[] = [
  {
    title: 'For candidates',
    description:
      'One of the main advantages of The Interview is the ability for candidates to record asynchronous videos and complete the entire application process through their mobile device. This allows candidates to record their answers at their own pace and on their own time, making the process more convenient and efficient for them.',
    src: '/images/candidate.png',
  },
  {
    title: 'For companies',
    description: `The Interview mobile feature allows them to review candidate responses and make informed hiring decisions from their mobile device, even when they're away from their office. This means that you can keep the hiring process moving and make decisions quickly, without the need to wait for candidates to finish the process.`,
    src: '/images/screen2.jpg',
  },
];

const Mobile: FC = () => {
  const swiper1Ref = useRef<Swiper | undefined>();
  const swiper2Ref = useRef<Swiper | undefined>();

  useLayoutEffect(() => {
    if (!swiper1Ref.current || !swiper2Ref.current) {
      return;
    }

    swiper1Ref.current.controller.control = swiper2Ref.current;
    swiper2Ref.current.controller.control = swiper1Ref.current;
  }, []);

  const handleNext = () => swiper1Ref.current?.slideNext();
  const handlePrev = () => swiper1Ref.current?.slidePrev();

  return (
    <div className="flex w-full flex-col grid w-full grid-cols-1 md:grid-cols-4 gap-10">
      <div className="overflow-hidden relative col-span-2 mx-16 drop-shadow-md">
        <div className="absolute w-[72%] ml-[13%] pt-[4.8%] rounded-xl overflow-hidden">
          <SwiperContainer
            className="w-full rounded-xl"
            modules={[Controller]}
            onSwiper={(swiper) => (swiper1Ref.current = swiper)}
            loop
          >
            {SLIDES.map(({ src, title }, i) => (
              <SwiperSlide className="w-full">
                <div className="relative aspect-[49/106] w-full">
                  <Image fill key={i} src={src} alt={title} />
                </div>
              </SwiperSlide>
            ))}
          </SwiperContainer>
        </div>
        <div className="aspect-[521/895] relative z-20 pointer-events-none w-full">
          <Phone className="relative z-20 pointer-events-none w-full" />
        </div>
      </div>
      <div className="col-span-2">
        <div className="flex items-center mb-4">
          <div
            className="flex w-10 h-10 mr-3 cursor-pointer rounded-full border border-gray-300 transition duration-200 ease-out hover:border-gray-100 hover:shadow-icon items-center justify-center"
            onClick={handlePrev}
          >
            <HiArrowLeft />
          </div>
          <div
            className="flex w-10 h-10 cursor-pointer rounded-full border border-gray-300 transition duration-200 ease-out hover:border-gray-100 hover:shadow-icon items-center justify-center"
            onClick={handleNext}
          >
            <HiArrowRight />
          </div>
        </div>
        <SwiperContainer
          className="w-full rounded-xl"
          modules={[Controller, EffectFade]}
          onSwiper={(swiper) => (swiper2Ref.current = swiper)}
          effect="fade"
          fadeEffect={{
            crossFade: true, // enables slides to cross fade
          }}
          loop
        >
          {SLIDES.map(({ title, description }) => (
            <SwiperSlide>
              <div key={title} className="text-left bg-white">
                <p className="text-xl font-thin py-2">{title}</p>
                <p className="leading-relaxed py-2 text-gray-800 text-md">
                  {description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </SwiperContainer>
      </div>
    </div>
  );
};

export default Mobile;
