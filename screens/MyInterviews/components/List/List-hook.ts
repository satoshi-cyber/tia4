import { UseCases } from '@/useCases';

import { SKELETON_INTERVIEWS } from './List-constants';

export const useMyInterviews = () => {
  const { data, isLoading } = UseCases.myInterviews.load();

  const myInterviews = isLoading ? SKELETON_INTERVIEWS : data;

  return { myInterviews, isLoading };
};
