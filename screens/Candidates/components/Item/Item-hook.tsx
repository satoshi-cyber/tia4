import { URLS } from '@/config';
import { useTimeAgo } from '@/hooks';

export const useItem = ({
  date,
  id,
  score,
}: {
  id: string;
  date?: string;
  score?: number | null;
}) => {
  const timeAgo = useTimeAgo(date);

  const href = URLS.RATE_INTERVIEW.replace('[interviewId]', String(id));

  const scoreLabel = `score: ${score || 'N/A'}`;

  return { timeAgo, href, scoreLabel };
};
