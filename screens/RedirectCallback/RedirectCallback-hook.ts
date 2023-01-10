import { DOMAIN, URLS } from "@/config";
import { useUser } from "@/hooks";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";

export const useRedirectCallback = () => {
  const router = useRouter()

  const { authenticateUserFromRedirect } = useUser()

  const jobId = router.query.jobId as string

  useLayoutEffect(() => {
    authenticateUserFromRedirect().then(() => {
      const url = encodeURIComponent(`${DOMAIN}${jobId ? URLS.APPLY.replace('[applyJobId]', jobId) : URLS.HOME}`)

      const href = `https://theinterview.page.link/?link=${url}`

      router.replace(href)
    })
  }, [jobId])
};
