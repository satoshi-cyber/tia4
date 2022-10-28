import { Pagination, Navigation, EffectCreative } from 'swiper'
import { SwiperProps } from 'swiper/react'

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
