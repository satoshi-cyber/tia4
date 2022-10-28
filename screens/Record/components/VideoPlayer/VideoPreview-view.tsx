import { Icon } from '@/components'

import { VIDEO_PROPS, BUTTON_PROPS, ICON_PROPS } from './VideoPreview-constants'
import { useVideoPreview } from './VideoPreview-hook'
import { VideoPlayerProps } from './VideoPreview-types'

const VideoPreview: React.FC<VideoPlayerProps> = ({ id, index }) => {
  const { url, playing, handlePlay, video } = useVideoPreview({ id, index })

  if (!url) return null

  return (
    <>
      <video {...VIDEO_PROPS} src={url} ref={video as any} muted={!playing} />
      {!playing && (
        <button {...BUTTON_PROPS} onClick={handlePlay}>
          <Icon {...ICON_PROPS} />
        </button>
      )}
    </>
  )
}

export default VideoPreview
