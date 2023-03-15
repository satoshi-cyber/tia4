import { DOMAIN, URLS } from "@/config";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";

export const useRedirectCallback = () => {
  const router = useRouter()

  useLayoutEffect(() => {
    if (!router.isReady) return;

    const magicCredential = router.query.magic_credential

    const from = router.query.from as string

    const url = encodeURIComponent(from ? `${DOMAIN}${URLS.DID_CALLBACK}/${from}?magic_credential=${magicCredential}` : `${DOMAIN}${URLS.DID_CALLBACK}?magic_credential=${magicCredential}`)

    const href = `https://theinterview.page.link/?link=${url}`

    router.replace(href)

  }, [router])
};
