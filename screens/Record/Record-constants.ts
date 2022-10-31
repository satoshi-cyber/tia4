import { Pagination, Navigation, EffectCreative } from 'swiper'
import { SwiperProps } from 'swiper/react'

export const CLASS_NAMES = {
  slide: "flex flex-1 w-full h-screen relative justify-center bg-gray-900",
  question: "absolute w-[80vw] lg:w-[400px] z-10 text-3xl text-gray-100 text-center mt-10 pointer-events-none drop-shadow-md translate-z-0"
}

export const RECORING_STATUS = 'recording'

export const SWIPER_OPTIONS = {
  preventClicks: true,
  pagination: {
    type: 'progressbar',
  },
  navigation: true,
  effect: 'creative',
  creativeEffect: {
    prev: {
      shadow: true,
      translate: [0, 0, -400],
    },
    next: {
      translate: ['100%', 0, 0],
    },
  },
  modules: [Pagination, Navigation, EffectCreative],
  className: 'absolute flex flex-1 w-full z-10 bg-gray-800',
} as SwiperProps

export const EMPTY_STATE = []
