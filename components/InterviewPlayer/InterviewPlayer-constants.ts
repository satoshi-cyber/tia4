import { EffectCreative, Navigation } from "swiper";
import { SwiperProps } from "swiper/react";

export const CLASS_NAMES = {
    container: {
        fullScreen: 'fixed w-screen h-screen top-0 bottom-0 left-0 right-0 z-50 bg-black',
        inline: 'w-full h-[400px] md:h-[525px] relative rounded-xl overflow-hidden bg-black transform-gpu'
    },
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