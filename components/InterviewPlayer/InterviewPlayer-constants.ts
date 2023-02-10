import { EffectCreative, Navigation } from "swiper";
import { SwiperProps } from "swiper/react";

export const CLASS_NAMES = {
    container: 'w-full h-[400px] md:h-[482px] relative rounded-2xl border border-gray-100 overflow-hidden bg-black transform-gpu',
    swiper: "w-full h-full"
}

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

export const SKELETON_PROPS = {
    width: "100%",
    height: "100%"
}