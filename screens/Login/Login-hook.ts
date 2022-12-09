import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from 'next/router';
import { LoginData } from './Login-types';
import { loginSchema } from './Login-validations';
import { useUser } from "@/hooks";
import { URLS } from "@/config";
import { useEffect } from "react";


export const useLogin = () => {
  const router = useRouter()

  const { login, isUserLoggedin } = useUser()

  const form = useForm<LoginData>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: yupResolver(loginSchema),
  });

  const handleSubmit = async ({ email }: LoginData) =>
    login(email).then(() => {
      router.push(URLS.HOME)
    })

  useEffect(() => {
    if (isUserLoggedin) {
      router.replace(URLS.HOME)
    }
  }, [isUserLoggedin])

  return {
    form,
    handleSubmit,
  };
};
