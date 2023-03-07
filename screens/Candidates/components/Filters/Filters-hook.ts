import { useJobsListQuery } from '@/graphql';
import { useUser } from '@/hooks';
import { useMemo } from 'react';

import { formatOptions } from './Filters-functions';

export const useFilters = () => {
  const { companyId } = useUser();

  const context = useMemo(() => ({ additionalTypenames: ['Job'] }), []);

  const [{ data, fetching }] = useJobsListQuery({
    context,
    variables: { companyId: companyId! },
    pause: !companyId,
  });

  const jobOptions = formatOptions(data?.jobs);

  return { jobOptions, fetching };
};
