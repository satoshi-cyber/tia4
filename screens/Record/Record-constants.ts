import { Pagination, Navigation, EffectCreative, Keyboard } from 'swiper'
import { SwiperProps } from 'swiper/react'

export const CLASS_NAMES = {
  container: "absolute w-full h-full overflow-hidden bg-gray-800",
  swiperContainer: {
    base: 'w-full h-full absolute transition-all duration-700 transform-gpu',
    lastSlideActive: 'blur-2xl',
    lastSlideDefault: 'blur-none',

  },
  slide: "flex flex-1 w-full h-screen relative justify-center bg-gray-900",
  questionWrapper: "absolute w-[80vw] lg:w-[400px] z-10 transform-gpu flex flex-col items-center",
  question: 'text-3xl text-white text-center mt-10 mb-3 pointer-events-none drop-shadow-question',
}

export const RECORING_STATUS = 'recording'

export const ACQUIRING_MEDIA = 'acquiring_media'

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
