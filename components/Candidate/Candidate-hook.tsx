import { URLS } from '@/config';
import { useTimeAgo } from '@/hooks';
import { formatData } from './Candidate-functions';

import { CandidateProps } from './Candidate-types';

export const useItem = ({ interview }: CandidateProps) => {
  const { id, thumbnail, candidateName, date, score, avatar, votesLeft } =
    formatData(interview);

  const timeAgo = useTimeAgo(date);

  const href = URLS.RATE_INTERVIEW.replace('[interviewId]', String(id));

  const scoreLabel = votesLeft
    ? `votes left: ${votesLeft}`
    : `score: ${score ? `${score}%` : 'N/A'}`;

  return {
    id,
    thumbnail,
    candidateName,
    date,
    score,
    avatar,
    timeAgo,
    href,
    scoreLabel,
  };
};
