import { useUser } from '@/hooks';
import { UseCases } from '@/useCases';
import useSwr from 'swr';

import { SKELETON_JOBS } from './List-constants';

export const useJobs = () => {
  const { companyId } = useUser();

  const { data, isLoading: fetching } = useSwr(
    ...UseCases.jobs.input(companyId && { companyId })
  );

  const jobs = fetching ? SKELETON_JOBS : data;

  return { jobs, fetching };
};
