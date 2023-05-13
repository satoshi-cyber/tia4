import { timeAgo } from '@/utils';

export const useTimeAgo = (date?: string | Date) => {
  if (!date) {
    return undefined;
  }

  return timeAgo(date);
};
