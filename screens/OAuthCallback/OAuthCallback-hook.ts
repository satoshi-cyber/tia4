import { URLS } from "@/config";
import { useUser } from "@/hooks";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";
import nextBase64 from 'next-base64';

export const useOAuthCallback = () => {
  const router = useRouter()

  const { authenticateUserFromOAuth } = useUser()

  useLayoutEffect(() => {
    if (!router.isReady) return;

    const from = router.query.from as string

    authenticateUserFromOAuth().then(() => {
      router.replace(from ? nextBase64.decode(from) : URLS.HOME)
    })
  }, [router])
};
