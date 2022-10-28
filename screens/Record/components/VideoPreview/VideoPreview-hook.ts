import { useEffect, useRef } from "react"

interface ViewPreviewOptions {
  stream?: MediaProvider
}

export const useVideoPreview = ({ stream }: ViewPreviewOptions) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
    }
  }, [stream])

  return {
    videoRef
  }
}
