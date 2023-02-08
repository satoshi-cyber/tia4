import { DOMAIN, URLS } from "@/config";
import { useUser } from "@/hooks";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";

export const useDidCallback = () => {
  const router = useRouter()

  const { authenticateUserFromDid } = useUser()

  useLayoutEffect(() => {
    if (!router.isReady) return;

    const jobId = router.query.jobId as string
    const did = router.query.did as string

    authenticateUserFromDid(did).then(() => {
      const url = `${DOMAIN}${jobId ? URLS.APPLY.replace('[applyJobId]', jobId) : URLS.HOME}`
      router.replace(url)
    })
  }, [router])
};
