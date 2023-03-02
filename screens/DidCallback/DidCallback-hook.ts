import { DOMAIN, URLS } from "@/config";
import { useUser } from "@/hooks";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";
import nextBase64 from 'next-base64';

export const useDidCallback = () => {
  const router = useRouter()

  const { authenticateUserFromDid } = useUser()

  useLayoutEffect(() => {
    if (!router.isReady) return;

    const from = router.query.from as string
    const did = router.query.did as string

    authenticateUserFromDid(did).then(() => {
      const url = from ? nextBase64.decode(from) : `${DOMAIN}${URLS.HOME}`

      router.replace(url)
    })
  }, [router])
};
