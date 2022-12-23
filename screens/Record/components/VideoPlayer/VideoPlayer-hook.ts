import { get } from "idb-keyval"
import { useEffect, useRef, useState } from "react"
import { useSwiper } from "swiper/react"

interface ViewPlayerOptions {
  id: string
  index: number
}

interface Size {
  width?: number
  height?: number
}

export const useVideoPreview = ({ id, index }: ViewPlayerOptions) => {
  const [url, setUrl] = useState<string | undefined>()
  const [playing, setPlaying] = useState(false)
  const [size, setSize] = useState<Size>({})

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

  useEffect(() => {
    const getSize = async () => {
      let display = await navigator.mediaDevices
        .getUserMedia({ audio: false, video: true });

      let settings = display.getVideoTracks()[0]
        .getSettings();

      const width = settings.width;
      const height = settings.height;

      setSize({ width, height })

    }

    getSize()
  }, [])


  return {
    size,
    video,
    handlePlay,
    playing,
    url
  }
}
