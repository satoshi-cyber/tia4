import React from 'react';
import SkeletonLoader from '@/components/SkeletonLoader';
import Avatar from '@/components/Avatar';
import Text from '@/components/Text';
import Link from 'next/link';

import { ItemProps } from './Item-types';
import { CLASS_NAMES, VIDEO_PROPS } from './Item-constants';
import { useItem } from './Item-hook';

const Item: React.FC<ItemProps> = ({
  id,
  thumbnail,
  date,
  avatar,
  companyName,
  jobTitle,
}) => {
  const { timeAgo, href, src } = useItem({ date, id, thumbnail });

  return (
    <div>
      <div className={CLASS_NAMES.container}>
        <SkeletonLoader
          height={300}
          after={
            <Link href={href} shallow>
              <video
                className={CLASS_NAMES.video}
                {...VIDEO_PROPS}
                src={src}
              ></video>
            </Link>
          }
        />
      </div>
      <div className={CLASS_NAMES.description}>
        <div className={CLASS_NAMES.avatarContainer}>
          <Avatar
            text={companyName || undefined}
            src={avatar || undefined}
            size={40}
          />
        </div>
        <div className={CLASS_NAMES.job}>
          <div className={CLASS_NAMES.firstLine}>
            <Text
              className={CLASS_NAMES.companyName}
              text={companyName}
              skeletonProps={{ width: 100 }}
            />
            <Text
              className={CLASS_NAMES.appliedDate}
              text={timeAgo}
              skeletonProps={{ width: 60 }}
            />
          </div>
          <Text
            className={CLASS_NAMES.jobTitle}
            text={jobTitle}
            skeletonProps={{ width: 160 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Item;
