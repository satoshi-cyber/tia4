import { Pagination, Navigation, EffectCreative, Keyboard } from 'swiper'
import { SwiperProps } from 'swiper/react'

export const CLASS_NAMES = {
  container: "absolute w-screen h-screen overflow-hidden bg-gray-800",
  swiperContainer: 'fixed top-0 bottom-0 left-0 right-0 flex',
  slide: "flex flex-1 relative w-screen h-screen justify-center bg-gray-900",
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
  modules: [Pagination, Navigation, Keyboard],
  className: 'flex flex-1 z-10 bg-gray-800',
  keyboard: { enabled: true },
} as SwiperProps

export const EMPTY_STATE = []

