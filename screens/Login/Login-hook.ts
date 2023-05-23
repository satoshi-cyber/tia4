import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { LoginData } from './Login-types';
import { loginSchema } from './Login-validations';
import { useUser } from '@/hooks';
import { URLS } from '@/config';
import { useCallback, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import InApp from 'detect-inapp';

import nextBase64 from 'next-base64';

export const useLogin = () => {
  const [isInApp, setIsInApp] = useState(false);
  const router = useRouter();

  const { login, isUserLoggedin, loginWithProvider } = useUser();

  const form = useForm<LoginData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(loginSchema),
  });

  const from = router.query.from as string;

  const handleSubmit = async ({ email }: LoginData) => login(email);

  useEffect(() => {
    if (isUserLoggedin) {
      router.push(from ? nextBase64.decode(from) : URLS.HOME);
    }
  }, [isUserLoggedin]);

  const loginWithLinkedin = useCallback(
    () => loginWithProvider('linkedin'),
    []
  );

  const loginWithFacebook = useCallback(
    () => loginWithProvider('facebook'),
    []
  );

  const loginWithGoogle = useCallback(() => loginWithProvider('google'), []);

  useEffect(() => {
    const inapp = new InApp(navigator.userAgent || navigator.vendor);

    setIsInApp(inapp.isInApp);
  }, []);

  return {
    form,
    isInApp,
    handleSubmit,
    loginWithLinkedin,
    loginWithFacebook,
    loginWithGoogle,
  };
};
