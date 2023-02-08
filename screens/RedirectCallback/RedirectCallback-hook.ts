import { DOMAIN, URLS } from "@/config";
import { useUser } from "@/hooks";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";

export const useRedirectCallback = () => {
  const router = useRouter()

  const { authenticateUserFromRedirect } = useUser()

  useLayoutEffect(() => {
    if (!router.isReady) return;

    const jobId = router.query.jobId as string

    console.log({ jobId })

    authenticateUserFromRedirect().then((did) => {
      const url = encodeURIComponent(jobId ? `${DOMAIN}${URLS.DID_CALLBACK}/${jobId}?did=${did}` : `${DOMAIN}${URLS.DID_CALLBACK}?did=${did}`)

      const href = `https://theinterview.page.link/?link=${url}`

      router.replace(href)
    })
  }, [router])
};
