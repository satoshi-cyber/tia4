import { Magic } from "magic-sdk";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useSWRConfig } from "swr";
import { OAuthExtension } from "@magic-ext/oauth";

import { addHook, useLoadData } from "../lib";

export const AuthService = {
  isLoggedIn: "AuthService-isLoggedin",
  login: "AuthService-login",
  oAuthCallback: "AuthService-callback",
  loginWithProvider: "AuthServicer-loginWithProvider",
  redirect: "AuthService-redirect",
  logout: "AuthService-logout",
};

const LOCAL_STORAGE_KEY = "auth";

const magic =
  typeof window !== "undefined" &&
  new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY, {
    extensions: [new OAuthExtension()],
  });

addHook(AuthService.isLoggedIn, () =>
  useCallback(() => localStorage.getItem(LOCAL_STORAGE_KEY), [])
);

addHook(AuthService.login, () => {
  const { mutate } = useSWRConfig();
  const router = useRouter();

  return useCallback(
    async ({ email }) => {
      const did = await magic?.auth.loginWithMagicLink({ email });

      localStorage.setItem(LOCAL_STORAGE_KEY, did);

      mutate([AuthService.isLoggedIn]);

      await router.push("/");
    },
    [mutate, router]
  );
});

addHook(AuthService.loginWithProvider, (provider) =>
  useCallback(
    () =>
      new Promise(() => {
        magic?.oauth.loginWithRedirect({
          provider,
          redirectURI: "http://localhost:3000/callback",
        });
      }),
    [provider]
  )
);

addHook(AuthService.oAuthCallback, () => {
  const router = useRouter();

  useEffect(() => {
    magic.oauth
      .getRedirectResult()
      .then((res) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, res.magic.idToken);
        router.push("/");
      })
      .catch((e) => console.log(e));
  }, [router]);
});

addHook(AuthService.redirect, () => {
  const { data, isValidating } = useLoadData([AuthService.isLoggedIn]);

  const router = useRouter();

  useEffect(() => {
    if (isValidating) return;

    if (data) {
      router.push("/record");
      return;
    }

    if (router.pathname !== "/login") {
      router.push("/login");
    }
  }, [data, isValidating, router]);
});

addHook(AuthService.logout, () => {
  const { mutate } = useSWRConfig();
  const router = useRouter();

  return useCallback(() => {
    return magic.user.logout().then(() => {
      localStorage.removeItem(LOCAL_STORAGE_KEY);

      mutate([AuthService.isLoggedIn]);

      router.push("/login");
    });
  }, [mutate, router]);
});
