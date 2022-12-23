import { Pagination, Navigation, EffectCreative, Keyboard } from 'swiper'
import { SwiperProps } from 'swiper/react'

export const CLASS_NAMES = {
  container: "absolute w-full h-full overflow-hidden bg-gray-800",
  swiperContainer: 'w-full h-full absolute transition-all duration-700 transform-gpu',
  slide: "flex flex-1 w-full h-screen relative justify-center bg-gray-900",
  questionWrapper: "absolute z-10 transform-gpu flex flex-col items-center backdrop-blur-2xl bg-black/10 rounded-3xl p-3 mt-6",
  question: {
    base: 'text-white text-center pointer-events-none transition-all transform-gpu duration-300',
    recording: 'text-xl md:text-2xl',
    default: 'text-xl md:text-2xl'
  }
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
