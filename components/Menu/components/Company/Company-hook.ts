import { useUser } from '@/hooks';
import { UseCases } from '@/useCases';

export const useCompany = () => {
  const { companyId } = useUser();

  const { isLoading, data } = UseCases.company.load(companyId && { companyId });

  const title = data?.name ?? undefined;

  return {
    isLoading,
    title,
  };
};
