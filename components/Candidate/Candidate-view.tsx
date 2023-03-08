import React from 'react';
import { Avatar, Text, SkeletonLoader } from '@/components';
import Link from 'next/link';

import { CandidateProps } from './Candidate-types';
import { CLASS_NAMES, VIDEO_PROPS } from './Candidate-constants';
import { useItem } from './Candidate-hook';

const Item: React.FC<CandidateProps> = ({ interview }) => {
  const { avatar, candidateName, thumbnail, timeAgo, href, scoreLabel } =
    useItem({ interview });

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
                src={thumbnail}
              ></video>
            </Link>
          }
        />
      </div>
      <div className={CLASS_NAMES.description}>
        <div className={CLASS_NAMES.avatarContainer}>
          <Avatar
            name={candidateName || undefined}
            src={avatar || undefined}
            className={CLASS_NAMES.avatar}
            size={40}
            round
          />
        </div>
        <div className={CLASS_NAMES.job}>
          <div className={CLASS_NAMES.firstLine}>
            <Text
              className={CLASS_NAMES.candidateName}
              text={candidateName}
              skeletonProps={{ width: 100 }}
            />
            <Text
              className={CLASS_NAMES.score}
              text={scoreLabel}
              skeletonProps={{ width: 60 }}
            />
          </div>
          <Text
            className={CLASS_NAMES.appliedDate}
            text={timeAgo}
            skeletonProps={{ width: 60 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Item;
