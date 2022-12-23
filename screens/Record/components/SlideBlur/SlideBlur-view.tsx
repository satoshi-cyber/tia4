import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useSwiper } from 'swiper/react';

import { CLASS_NAMES } from './SlideBlur-constants';

const SlideBlur: React.FC = () => {
  const swiper = useSwiper();

  const [lastSlide, setLastSlide] = useState(false);

  useEffect(() => {
    if (!swiper) {
      return;
    }

    swiper.on('slideChange', () => {
      if (swiper.realIndex === swiper.slides.length - 1) {
        setLastSlide(true);
      } else {
        setLastSlide(false);
      }
    });
  }, [swiper]);

  console.log({ lastSlide });

  return (
    <div
      className={clsx(
        CLASS_NAMES.containerBase,
        lastSlide ? 'backdrop-blur-2xl bg-black/20' : 'backdrop-blur-[0px]'
      )}
    />
  );
};

export default SlideBlur;
