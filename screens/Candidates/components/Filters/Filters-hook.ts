import { useUser } from '@/hooks';
import { UseCases } from '@/useCases';

import { formatOptions } from './Filters-functions';

export const useFilters = () => {
  const { companyId } = useUser();

  const { data, isLoading } = UseCases.jobs.load(companyId && { companyId });

  const jobOptions = formatOptions(data);

  return { jobOptions, isLoading };
};
