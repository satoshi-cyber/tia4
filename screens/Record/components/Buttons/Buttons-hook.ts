import { useEffect, useState } from "react"
import Swiper from "swiper"

interface ButtonOptions {
  swiper?: Swiper
}

export const useButtons = ({ swiper }: ButtonOptions) => {
  const [realIndex, setRealIndex] = useState<number>(swiper?.realIndex || 0)

  useEffect(() => {
    swiper?.on('slideChange', () => {
      setRealIndex(swiper.realIndex)
    })
  }, [swiper])

  return {
    realIndex
  }
}
