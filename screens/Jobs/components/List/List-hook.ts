import { useUser } from '@/hooks';
import useLoadData from '@/hooks/useLoadData';
import { UseCases } from '@/useCases';

import { SKELETON_JOBS } from './List-constants';

export const useJobs = () => {
  const { companyId } = useUser();

  const { data, isLoading: fetching } = useLoadData(
    ...UseCases.jobs.input(companyId && { companyId })
  );

  const jobs = fetching ? SKELETON_JOBS : data;

  return { jobs, fetching };
};
