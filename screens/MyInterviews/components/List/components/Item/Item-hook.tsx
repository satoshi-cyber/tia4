import { URLS } from '@/config';
import { useTimeAgo } from '@/hooks';

export const useItem = ({ date, id }: { id: string; date?: string }) => {
  const timeAgo = useTimeAgo(date);

  const href = URLS.MY_INTERVIEW.replace('[interviewId]', String(id));

  return { timeAgo, href };
};
