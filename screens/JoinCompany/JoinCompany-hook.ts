import { TOAST_OPTIONS, URLS } from '@/config';
import { useUser } from '@/hooks';
import { UseCases } from '@/useCases';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { TOAST_MESSAGE } from './JoinCompany-constants';

export const useJoinCompany = () => {
  const router = useRouter();

  const { refreshToken } = useUser();

  const companyId = router.query.companyId as string;

  const { data, isLoading } = UseCases.company.load({ companyId });

  const { trigger: joinCompany, isMutating } = UseCases.joinCompany.mutate();

  const title = data?.name ?? undefined;
  const avatar = data?.avatarUrl ?? '';

  const handleJoinCompany = async () => {
    try {
      await joinCompany({ companyId });

      await refreshToken();

      toast.success(TOAST_MESSAGE.success, TOAST_OPTIONS);

      router.push(URLS.COMPANY);
    } catch (e) {
      toast.error(TOAST_MESSAGE.error, TOAST_OPTIONS);
    }
  };

  return {
    isLoading,
    avatar,
    title,
    isMutating,
    handleJoinCompany,
  };
};
