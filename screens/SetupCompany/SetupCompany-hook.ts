import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useUser } from '@/hooks';
import { TOAST_OPTIONS, URLS } from '@/config';
import { UseCases } from '@/useCases';
import { zodResolver } from '@hookform/resolvers/zod';
import { setupCompanySchema } from '@/types';

import { PUSH_DELAY, TOAST_MESSAGE } from './SetupCompany-constants';

export const useSetupCompany = () => {
  const router = useRouter();
  const { refreshToken, fetching: gettingNewToken } = useUser();

  const { trigger: setupCompany, isMutating: settingUpCompany } =
    UseCases.setupCompany.mutate();

  const { trigger: skipOnboarding, isMutating: skippingOnboarding } =
    UseCases.skipOnboarding.mutate();

  const submitting = settingUpCompany || skippingOnboarding || gettingNewToken;

  const form = useForm<Zod.infer<typeof setupCompanySchema>>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(setupCompanySchema),
  });

  const handleSubmit = async (input: Zod.infer<typeof setupCompanySchema>) => {
    try {
      await setupCompany(input);

      await refreshToken();

      toast.success(TOAST_MESSAGE.success, TOAST_OPTIONS);

      setTimeout(() => router.push(URLS.JOBS), PUSH_DELAY);
    } catch (e) {
      toast.error(TOAST_MESSAGE.error, TOAST_OPTIONS);
    }
  };

  const handleSkip = async () => {
    await skipOnboarding();

    await refreshToken();

    router.push(URLS.HOME);
  };

  return {
    form,
    handleSubmit,
    handleSkip,
    submitting,
  };
};
