import SkeletonLoader from '@/components/SkeletonLoader';
import Link from 'next/link';
import React from 'react';

import { CLASS_NAMES, VIDEO_PROPS } from './Thumbnail-constants';
import { ThumbnailProps } from './Thumbnail-types';

const Thumbnail: React.FC<ThumbnailProps> = ({ href, thumbnail }) => (
  <SkeletonLoader
    height={300}
    after={
      <Link href={href} shallow>
        <video
          className={CLASS_NAMES.video}
          {...VIDEO_PROPS}
          src={thumbnail}
        ></video>
      </Link>
    }
  />
);

export default React.memo(Thumbnail, () => true);
