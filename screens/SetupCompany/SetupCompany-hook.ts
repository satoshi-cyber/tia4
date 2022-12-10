import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import { useRouter } from "next/router";
import { SetupCompany, useSetupCompanyMutation, } from "@/graphql";
import { useUser } from "@/hooks";

import { setupCompanySchema } from "./SetupCompany-validations";
import { PUSH_DELAY, TOAST_MESSAGE, TOAST_OPTIONS } from './SetupCompany-constants';

import { URLS } from "@/config";

export const useSetupCompany = () => {
  const router = useRouter()
  const { refreshToken } = useUser()
  const [{ fetching: submitting }, setupCompany] = useSetupCompanyMutation();

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

  return {
    form,
    handleSubmit,
    submitting,
  };
};
