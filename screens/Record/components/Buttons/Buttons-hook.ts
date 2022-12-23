import { useEffect, useState } from "react"
import Swiper from "swiper"

interface ButtonOptions {
  swiper?: Swiper
}

export const useButtons = ({ swiper }: ButtonOptions) => {
  const [realIndex, setRealIndex] = useState<number>(swiper?.realIndex || 0)
  const [lastSlide, setLastSlide] = useState(false);

  useEffect(() => {
    swiper?.on('slideChange', () => {
      setRealIndex(swiper.realIndex)

      if (swiper.realIndex === swiper.slides.length - 1) {
        setLastSlide(true);
      } else {
        setLastSlide(false);
      }

    })
  }, [swiper])

  return {
    realIndex,
    lastSlide
  }
}
