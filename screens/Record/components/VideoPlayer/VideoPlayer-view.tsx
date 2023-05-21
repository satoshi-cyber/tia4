import Icon from '@/components/Icon';

import { VIDEO_PROPS, BUTTON_PROPS, ICON_PROPS } from './VideoPlayer-constants';
import { useVideoPreview } from './VideoPlayer-hook';
import { VideoPlayerProps } from './VideoPlayer-types';

const VideoPreview: React.FC<VideoPlayerProps> = ({ id, blob, index }) => {
  const { url, playing, handlePlay, video } = useVideoPreview({
    id,
    blob,
    index,
  });

  if (!url) return null;

  return (
    <>
      <video {...VIDEO_PROPS} src={url} ref={video as any} muted={!playing} />
      {!playing && (
        <button {...BUTTON_PROPS} onClick={handlePlay}>
          <Icon {...ICON_PROPS} />
        </button>
      )}
    </>
  );
};

export default VideoPreview;
