import { VIDEO_PROPS } from './VideoPreview-constants'
import { useVideoPreview } from './VideoPreview-hook'
import { VideoPreviewProps } from './VideoPreview-types'

const VideoPreview: React.FC<VideoPreviewProps> = ({ stream }) => {
  const { videoRef } = useVideoPreview({ stream })

  return <video ref={videoRef} {...VIDEO_PROPS} />
}

export default VideoPreview
