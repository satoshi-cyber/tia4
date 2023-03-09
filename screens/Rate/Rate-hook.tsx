import { usePendingRatesQuery } from '@/graphql';
import { useUser } from '@/hooks';
import { useMemo } from 'react';

import { SKELETON_INTERVIEWS } from './Rate-constants';

export const useRate = () => {
  const { companyId } = useUser();

  const context = useMemo(() => ({ additionalTypenames: ['Rate'] }), []);

  const [{ data, fetching }] = usePendingRatesQuery({
    variables: {
      companyId: companyId!,
    },
    context,
    pause: !companyId,
  });

  const interviews = fetching
    ? SKELETON_INTERVIEWS
    : data?.pendingRates?.map(({ interview }) => interview);

  const isListVisible = !fetching && interviews && interviews.length > 0;

  return {
    interviews,
    isListVisible,
    fetching,
  };
};
