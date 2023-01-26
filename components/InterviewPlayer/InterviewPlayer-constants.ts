import { EffectCreative, Navigation } from "swiper";
import { SwiperProps } from "swiper/react";

export const SWIPER_OPTIONS = {
    allowTouchMove: false,
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
    modules: [Navigation, EffectCreative],
    className: 'w-full h-full'
} as SwiperProps