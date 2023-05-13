import { useUser } from '@/hooks';
import { UseCases } from '@/useCases';

export const useCompanyHeader = () => {
  const { companyId } = useUser();

  const { data, isLoading } = UseCases.company.load(companyId && { companyId });

  const title = data?.name ?? undefined;
  const avatar = data?.avatarUrl || '';

  return {
    isLoading,
    avatar,
    title,
  };
};
