import { Magic } from "magic-sdk";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { OAuthExtension } from "@magic-ext/oauth";

import { addHook, useHook } from "../lib";

export const AuthService = {
  push: "AuthService-push",
  login: "AuthService-login",
  oAuthCallback: "AuthService-callback",
  loginWithProvider: "AuthServicer-loginWithProvider",
  redirect: "AuthService-redirect",
  logout: "AuthService-logout",
};

const AUTH_KEY = "auth";
const FROM_URL_KEY = "from";

const magic =
  typeof window !== "undefined" &&
  new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY, {
    extensions: [new OAuthExtension()],
  });

addHook(AuthService.push, () => {
  const router = useRouter();

  return useCallback(
    (did) => {
      localStorage.setItem(AUTH_KEY, did);

      const from = localStorage.getItem(FROM_URL_KEY);

      if (from) {
        localStorage.removeItem(FROM_URL_KEY);

        router.push(from);

        return;
      }

      router.push("/");
    },
    [router]
  );
});

addHook(AuthService.login, () => {
  const push = useHook([AuthService.push]);

  return useCallback(
    async ({ email }) => {
      const did = await magic?.auth.loginWithMagicLink({ email });

      push(did);
    },
    [push]
  );
});

addHook(AuthService.loginWithProvider, (provider) =>
  useCallback(
    () =>
      new Promise((resolve) => {
        window.addEventListener("popstate", function (e) {
          resolve(true);
        });

        magic?.oauth.loginWithRedirect({
          provider,
          redirectURI: `${window.location.origin}/oauth-callback`,
        });
      }),
    [provider]
  )
);

addHook(AuthService.oAuthCallback, () => {
  const push = useHook([AuthService.push]);

  useEffect(() => {
    magic.oauth
      .getRedirectResult()
      .then((res) => {
        push(res.magic.idToken);
      })
      .catch((e) => console.log(e));
  }, [push]);
});

addHook(AuthService.redirect, () => {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/login" && localStorage.getItem(AUTH_KEY)) {
      router.push("/");
    }

    if (router.pathname === "/oauth-callback" || router.pathname === "/login") {
      return;
    }

    if (!localStorage.getItem(AUTH_KEY)) {
      if (router.pathname !== "/logout") {
        localStorage.setItem(FROM_URL_KEY, window.location);
      }

      router.push("/login");
    }
  }, [router]);
});

addHook(AuthService.logout, () => {
  const router = useRouter();

  return useCallback(() => {
    return magic.user.logout().then(() => {
      localStorage.removeItem(AUTH_KEY);

      router.push("/login");
    });
  }, [router]);
});
