import SkeletonLoader from '@/components/SkeletonLoader';
import Link from 'next/link';
import React, { useContext } from 'react';

import { CLASS_NAMES, VIDEO_PROPS } from './Thumbnail-constants';
import { ThumbnailProps } from './Thumbnail-types';
import S3UrlProvider from '@/context/S3UrlProvider';

const Thumbnail: React.FC<ThumbnailProps> = ({ href, thumbnail }) => {
  const { getUrl } = useContext(S3UrlProvider.Context);

  return (
    <SkeletonLoader
      height={300}
      after={
        <Link href={href} shallow>
          <video
            className={CLASS_NAMES.video}
            {...VIDEO_PROPS}
            src={thumbnail ? getUrl(thumbnail) : undefined}
          ></video>
        </Link>
      }
    />
  );
};

export default Thumbnail;
