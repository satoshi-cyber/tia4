import clsx from "clsx"
import { get } from "idb-keyval"
import { useEffect, useRef, useState } from "react"
import { useSwiper } from "swiper/react"
import { CLASS_NAMES } from "./VideoPlayer-constants"

interface ViewPlayerOptions {
  id: string
  index: number
}

export const useVideoPreview = ({ id, index }: ViewPlayerOptions) => {
  const [loaded, setLoaded] = useState<boolean>(false)
  const [url, setUrl] = useState<string | undefined>()
  const [playing, setPlaying] = useState(false)

  const video = useRef<HTMLVideoElement>()

  useEffect(() => {
    get(id).then((url) => setUrl(URL.createObjectURL(url)))
  }, [id])

  useEffect(() => {
    if (!url || !video.current) return

    video.current.currentTime = 0.01
  }, [url])

  const swiper = useSwiper()

  useEffect(() => {
    if (!swiper) {
      return
    }

    swiper.on('slideChange', () => {
      if (!video.current) {
        return
      }

      setPlaying(false)

      if (index === swiper.realIndex) {
        video.current.play()
      } else {
        video.current.pause()
      }
    })
  }, [index, swiper])

  const handlePlay = () => {
    video.current?.play()

    setPlaying(true)
  }

  const classNames = {
    video: clsx(CLASS_NAMES.video, loaded ? 'opacity-100' : 'opacity-0')
  }

  const handleOnLoad = () => setLoaded(true)

  return {
    video,
    classNames,
    handleOnLoad,
    handlePlay,
    playing,
    url
  }
}
