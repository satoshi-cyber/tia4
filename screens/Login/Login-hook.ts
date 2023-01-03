import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from 'next/router';
import { LoginData } from './Login-types';
import { loginSchema } from './Login-validations';
import { useUser } from "@/hooks";
import { URLS } from "@/config";
import { useCallback, useEffect } from "react";


export const useLogin = () => {
  const router = useRouter()

  const { login, isUserLoggedin, loginWithProvider } = useUser()

  const form = useForm<LoginData>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: yupResolver(loginSchema),
  });

  const jobId = router.query.jobId as string

  const handleSubmit = async ({ email }: LoginData) =>
    login(email)

  useEffect(() => {
    if (isUserLoggedin) {
      router.push(jobId ? URLS.RECORD.replace('[applyJobId]', jobId) : URLS.HOME)
    }
  }, [isUserLoggedin])


  const loginWithLinkedin = useCallback(() => loginWithProvider('linkedin', jobId), [])

  const loginWithFacebook = useCallback(() => loginWithProvider('facebook', jobId), [])

  return {
    form,
    handleSubmit,
    loginWithLinkedin,
    loginWithFacebook
  };
};
