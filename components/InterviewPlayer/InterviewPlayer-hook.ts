import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import Swiper from "swiper";
import { CLASS_NAMES } from "./InterviewPlayer-constants";

interface IntervewPlayerOptions {
  className?: string
}

export const useInterviewPlayer = ({ className }: IntervewPlayerOptions) => {
  const players = useRef<any[]>([]);

  const [swiper, setSwiper] = useState<Swiper>();
  const [fullScreen, setFullScreen] = useState(false);

  const onEnded = () => swiper?.slideNext();

  useEffect(() => {
    swiper?.on('slideChange', () => {
      players.current.forEach((player, index) => {
        if (swiper.realIndex === index) {
          return player.video.play();
        }

        player.video.pause();
      });
    });
  }, [swiper]);

  useEffect(() => {
    if (!swiper)
      return

    players.current.forEach((player, index) => {
      if (swiper.realIndex === index) {
        return player.video.play();
      }

      player.video.pause();
      player.video.seek(0)
    });
  }, [swiper])

  const toggleFullScreen = () => setFullScreen(!fullScreen);

  const classNames = {
    ...CLASS_NAMES,
    container: clsx(className, fullScreen ? CLASS_NAMES.container.fullScreen : CLASS_NAMES.container.inline)
  }

  return {
    onEnded,
    toggleFullScreen,
    setSwiper,
    players,
    classNames,
    fullScreen
  }
}