import React from 'react';
import { Avatar, Text, SkeletonLoader, Icon } from '@/components';
import Link from 'next/link';
import { useTimeAgo } from '@/hooks';

import { ItemProps } from './Item-types';
import { CLASS_NAMES, VIDEO_PROPS, ICON_PROPS } from './Item-constants';

const Item: React.FC<ItemProps> = ({
  thumbnail,
  date,
  avatar,
  companyName,
  jobTitle,
}) => {
  const timeAgo = useTimeAgo(date);

  return (
    <div>
      <div className={CLASS_NAMES.container}>
        <SkeletonLoader
          height={300}
          after={
            <Link href="/app/my-interviews">
              <video
                className={CLASS_NAMES.video}
                {...VIDEO_PROPS}
                src={thumbnail}
              ></video>
              <Icon {...ICON_PROPS} className={CLASS_NAMES.icon} />
            </Link>
          }
        />
      </div>
      <div className={CLASS_NAMES.description}>
        <div className={CLASS_NAMES.avatarContainer}>
          <Avatar
            name={companyName || undefined}
            src={avatar || undefined}
            className={CLASS_NAMES.avatar}
            size={40}
            round
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
