import { FC, useState } from 'react';
import { SwiperSlide, Swiper as SwiperContainer } from 'swiper/react';
import Swiper, { Controller, EffectFade } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { Icon } from '@/components';

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
    src: '/images/screen2.png',
  },
];

interface Slick {
  slickGoTo: (slide: number) => void;
  slickPrev: () => void;
  slickNext: () => void;
}

const Mobile: FC = () => {
  const [firstSwiper, setFirstSwiper] = useState<Swiper | null>(null);
  const [secondSwiper, setSecondSwiper] = useState<Swiper | null>(null);

  const handleNext = () => firstSwiper?.slideNext();

  const handlePrev = () => firstSwiper?.slidePrev();

  return (
    <div className="flex w-full flex-col grid w-full grid-cols-1 md:grid-cols-4 gap-10">
      <div className="text-left text-2xl font-light leading-tight">
        <p>
          Effortlessly manage your recruitment process{' '}
          <span className="font-medium text-purple-800">on-the-go</span> with
          mobile-friendly web-based platform{' '}
        </p>
      </div>
      <div className="overflow-hidden relative col-span-2 mx-16 drop-shadow-md">
        <div className="w-full absolute w-[72%] ml-[13%] pt-[4.8%] rounded-xl overflow-hidden">
          <SwiperContainer
            className="w-full rounded-xl"
            modules={[Controller]}
            onSwiper={setFirstSwiper}
            controller={secondSwiper ? { control: secondSwiper } : undefined}
            loop
          >
            {SLIDES.map(({ src }, i) => (
              <SwiperSlide className="w-full">
                <img
                  key={i}
                  src={src}
                  className="w-full h-full object-cover"
                  alt={`Slide ${i + 1}`}
                />
              </SwiperSlide>
            ))}
          </SwiperContainer>
        </div>
        <img
          width="100%"
          src="/images/phone.svg"
          alt="phone"
          className="relative z-20 pointer-events-none"
        />
      </div>
      <div className="">
        <div className="flex items-center mb-4">
          <div
            className="flex w-10 h-10 mr-3 cursor-pointer rounded-full border border-gray-300 transition duration-200 ease-out hover:border-gray-100 hover:shadow-button items-center justify-center"
            onClick={handlePrev}
          >
            <Icon name="HiArrowLeft" />
          </div>
          <div
            className="flex w-10 h-10 cursor-pointer rounded-full border border-gray-300 transition duration-200 ease-out hover:border-gray-100 hover:shadow-button items-center justify-center"
            onClick={handleNext}
          >
            <Icon name="HiArrowRight" />
          </div>
        </div>
        <SwiperContainer
          className="w-full rounded-xl"
          modules={[Controller, EffectFade]}
          onSwiper={setSecondSwiper}
          effect="fade"
          fadeEffect={{
            crossFade: true, // enables slides to cross fade
          }}
          controller={firstSwiper ? { control: firstSwiper } : undefined}
          loop
        >
          {SLIDES.map(({ title, description }) => (
            <SwiperSlide>
              <div key={title} className="text-left bg-white">
                <p className="text-xl font-thin py-2">{title}</p>
                <p className="leading-relaxed py-2 text-gray-600 text-md">
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
