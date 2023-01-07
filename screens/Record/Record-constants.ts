import { Pagination, Navigation, EffectCreative, Keyboard } from 'swiper'
import { SwiperProps } from 'swiper/react'

export const CLASS_NAMES = {
  container: "fixed top-0 left-0 bottom-0 right-0 overflow-hidden bg-gray-800",
  swiperContainer: 'fixed top-0 left-0 bottom-0 right-0 transition-all duration-700',
  slide: "flex flex-1 w-full h-full relative justify-center bg-gray-900",
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
  className: 'absolute flex flex-1 w-full h-full z-10 bg-gray-800',
  keyboard: { enabled: true },
} as SwiperProps

export const EMPTY_STATE = []

