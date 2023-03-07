import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import { useRouter } from "next/router";
import { SetupCompany, useSetupCompanyMutation, useSkipOnboardingMutation, } from "@/graphql";
import { useUser } from "@/hooks";

import { setupCompanySchema } from "./SetupCompany-validations";
import { PUSH_DELAY, TOAST_MESSAGE } from './SetupCompany-constants';

import { TOAST_OPTIONS, URLS } from "@/config";

export const useSetupCompany = () => {
  const router = useRouter()
  const { refreshToken, fetching: gettingNewToken } = useUser()
  const [{ fetching: settingUpCompany }, setupCompany] = useSetupCompanyMutation();
  const [{ fetching: skippingOnboarding }, skipOnboarding] = useSkipOnboardingMutation();

  const submitting = settingUpCompany || skippingOnboarding || gettingNewToken

  const form = useForm<SetupCompany>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: yupResolver(setupCompanySchema),
  });

  const handleSubmit = async (input: SetupCompany) => {
    const { error } = await setupCompany({ input }, { additionalTypenames: ['Company'] })

    await refreshToken()

    if (error) {
      toast.error(TOAST_MESSAGE.error, TOAST_OPTIONS)

      return
    }

    toast.success(TOAST_MESSAGE.success, TOAST_OPTIONS)

    setTimeout(() => router.push(URLS.JOBS), PUSH_DELAY)
  };

  const handleSkip = async () => {
    await skipOnboarding({})

    await refreshToken()

    router.push(URLS.HOME)
  };

  return {
    form,
    handleSubmit,
    handleSkip,
    submitting,
  };
};
