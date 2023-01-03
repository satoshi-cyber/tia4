import { URLS } from "@/config";
import { useUser } from "@/hooks";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";

export const useOAuthCallback = () => {
  const router = useRouter()

  const { authenticateUserFromOAuth } = useUser()

  const jobId = router.query.jobId as string

  useLayoutEffect(() => {
    authenticateUserFromOAuth().then(() => {
      router.replace(jobId ? URLS.RECORD.replace('[applyJobId]', jobId) : URLS.HOME)
    })
  }, [])
};
