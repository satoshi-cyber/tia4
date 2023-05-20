import React from 'react';
import { Avatar, Text } from '@/components';

import { CandidateProps } from './Candidate-types';
import { CLASS_NAMES } from './Candidate-constants';
import { useItem } from './Candidate-hook';
import Thumbnail from './components/Thumbnail';

const Item: React.FC<CandidateProps> = ({ interview }) => {
  const { avatar, candidateName, thumbnail, timeAgo, href, scoreLabel } =
    useItem({ interview });

  return (
    <div>
      <div className={CLASS_NAMES.container}>
        <Thumbnail href={href} thumbnail={thumbnail} />
      </div>
      <div className={CLASS_NAMES.description}>
        <div className={CLASS_NAMES.avatarContainer}>
          <Avatar text={candidateName || undefined} src={avatar} size={40} />
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
