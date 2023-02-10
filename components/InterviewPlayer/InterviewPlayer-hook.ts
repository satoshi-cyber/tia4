import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useFullScreenHandle } from "react-full-screen";
import Swiper from "swiper";
import { CLASS_NAMES } from "./InterviewPlayer-constants";

interface IntervewPlayerOptions {
  className?: string
}

export const useInterviewPlayer = ({ className }: IntervewPlayerOptions) => {
  const handle = useFullScreenHandle()

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
        return
      }

      player.video.pause();
      player.video.seek(0)
    });
  }, [swiper])

  const toggleFullScreen = () => {
    setFullScreen(!fullScreen)
  };

  useEffect(() => {
    if (fullScreen) {
      handle.enter()

      return
    }

    handle.exit()
  }, [fullScreen])

  useEffect(() => {
    if (!handle.active) {
      setFullScreen(false)
    }

  }, [handle.active])

  const classNames = {
    ...CLASS_NAMES,
    container: clsx(className, CLASS_NAMES.container)
  }

  return {
    handle,
    onEnded,
    toggleFullScreen,
    setSwiper,
    players,
    classNames,
    fullScreen
  }
}