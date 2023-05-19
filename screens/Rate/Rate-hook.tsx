import { useUser } from '@/hooks';

import { SKELETON_INTERVIEWS } from './Rate-constants';
import { UseCases } from '@/useCases';

export const useRate = () => {
  const { companyId } = useUser();

  const { data, isLoading } = UseCases.pendingRates.load(
    companyId && { companyId }
  );

  const interviews = isLoading
    ? SKELETON_INTERVIEWS
    : data?.map(({ interview }) => interview);

  const isListVisible = !isLoading && interviews && interviews.length > 0;

  return {
    interviews,
    isListVisible,
    isLoading,
  };
};
