import { DOMAIN, URLS } from "@/config";
import { useUser } from "@/hooks";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";

export const useRedirectCallback = () => {
  const router = useRouter()

  const { authenticateUserFromRedirect } = useUser()

  useLayoutEffect(() => {
    if (!router.isReady) return;

    const from = router.query.from as string

    authenticateUserFromRedirect().then((did) => {
      const url = encodeURIComponent(from ? `${DOMAIN}${URLS.DID_CALLBACK}/${from}?did=${did}` : `${DOMAIN}${URLS.DID_CALLBACK}?did=${did}`)

      const href = `https://theinterview.page.link/?link=${url}`

      router.replace(href)
    })
  }, [router])
};
