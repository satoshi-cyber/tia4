import { URLS } from "@/config";
import { useUser } from "@/hooks";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";

export const useRedirectCallback = () => {
  const router = useRouter()

  const { authenticateUserFromRedirect } = useUser()

  const jobId = router.query.jobId as string

  useLayoutEffect(() => {
    authenticateUserFromRedirect().then(() => {
      router.replace(jobId ? URLS.APPLY.replace('[applyJobId]', jobId) : URLS.HOME)
    })
  }, [])
};
