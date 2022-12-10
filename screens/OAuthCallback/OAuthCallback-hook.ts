import { URLS } from "@/config";
import { useUser } from "@/hooks";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";

export const useOAuthCallback = () => {
  const router = useRouter()

  const { authenticateUserFromOAuth } = useUser()

  useLayoutEffect(() => {
    authenticateUserFromOAuth().then(() => {
      router.replace(URLS.HOME)
    })
  }, [])
};
