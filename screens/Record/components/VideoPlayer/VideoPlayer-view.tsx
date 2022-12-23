import { Icon } from '@/components';

import { VIDEO_PROPS, BUTTON_PROPS, ICON_PROPS } from './VideoPlayer-constants';
import { useVideoPreview } from './VideoPlayer-hook';
import { VideoPlayerProps } from './VideoPlayer-types';

const VideoPreview: React.FC<VideoPlayerProps> = ({ id, index }) => {
  const { url, playing, handlePlay, video, classNames, handleOnLoad } =
    useVideoPreview({
      id,
      index,
    });

  if (!url) return null;

  return (
    <>
      <video
        {...VIDEO_PROPS}
        src={url}
        ref={video as any}
        className={classNames.video}
        muted={!playing}
        onLoadedMetadata={handleOnLoad}
      />
      {!playing && (
        <button {...BUTTON_PROPS} onClick={handlePlay}>
          <Icon {...ICON_PROPS} />
        </button>
      )}
    </>
  );
};

export default VideoPreview;
