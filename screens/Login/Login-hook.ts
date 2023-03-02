import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from 'next/router';
import { LoginData } from './Login-types';
import { loginSchema } from './Login-validations';
import { useUser } from "@/hooks";
import { URLS } from "@/config";
import { useCallback, useEffect } from "react";
import nextBase64 from 'next-base64';

export const useLogin = () => {
  const router = useRouter()

  const { login, isUserLoggedin, loginWithProvider } = useUser()

  const form = useForm<LoginData>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: yupResolver(loginSchema),
  });

  const from = router.query.from as string

  const handleSubmit = async ({ email }: LoginData) =>
    login(email)

  useEffect(() => {
    if (isUserLoggedin) {
      router.push(from ? nextBase64.decode(from) : URLS.HOME)
    }
  }, [isUserLoggedin])


  const loginWithLinkedin = useCallback(() => loginWithProvider('linkedin'), [])

  const loginWithFacebook = useCallback(() => loginWithProvider('facebook'), [])

  return {
    form,
    handleSubmit,
    loginWithLinkedin,
    loginWithFacebook
  };
};
