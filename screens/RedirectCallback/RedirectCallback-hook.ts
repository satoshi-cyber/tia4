import { DOMAIN, URLS } from "@/config";
import { useUser } from "@/hooks";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";

export const useRedirectCallback = () => {
  const router = useRouter()

  const { authenticateUserFromRedirect } = useUser()

  const jobId = router.query.jobId as string

  console.log({ jobId })

  useLayoutEffect(() => {
    authenticateUserFromRedirect().then((did) => {
      const url = encodeURIComponent(jobId ? `${DOMAIN}${URLS.DID_CALLBACK}?did=${did}&jobId=${jobId}` : `${DOMAIN}${URLS.DID_CALLBACK}?did=${did}`)

      const href = `https://theinterview.page.link/?link=${url}`

      router.replace(href)
    })
  }, [jobId])
};
