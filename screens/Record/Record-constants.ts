import { Pagination, Navigation, EffectCreative, Keyboard } from 'swiper'
import { SwiperProps } from 'swiper/react'

export const CLASS_NAMES = {
  slide: "flex flex-1 w-full h-screen relative justify-center bg-gray-900",
  question: "absolute w-[80vw] lg:w-[400px] z-10 text-3xl text-gray-100 text-center mt-10 pointer-events-none drop-shadow-md transform-gpu"
}

export const RECORING_STATUS = 'recording'

export const SWIPER_OPTIONS = {
  preventClicks: true,
  preventClicksPropagation: true,
  allowTouchMove: true,
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
  modules: [Pagination, Navigation, EffectCreative, Keyboard],
  className: 'absolute flex flex-1 w-full z-10 bg-gray-800',
  keyboard: { enabled: true },
} as SwiperProps

export const EMPTY_STATE = []
