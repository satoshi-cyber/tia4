import { URLS } from "@/config"
import { useRouter } from "next/router"
import { toast } from 'react-toastify';

import { TOAST_MESSAGE, TOAST_OPTIONS } from "./Item-constants";

interface ItemOptions {
  jobId: string | number
}

export const useItem = ({ jobId }: ItemOptions) => {
  const router = useRouter()

  const handleEditJob = () => {
    router.push({ pathname: URLS.JOB, query: { jobId } })
  }

  const handleCopyLink = async () => {
    try {
      const baseUrl = window.location.href.split(window.location.pathname)[0]

      const pathname = URLS.RECORD.replace('[jobId]', String(jobId))

      await navigator.clipboard.writeText(`${baseUrl}${pathname}`)

      toast.success(TOAST_MESSAGE.success, TOAST_OPTIONS)

    } catch (e) {

      toast.error(TOAST_MESSAGE.error, TOAST_OPTIONS)

    }
  }

  return { handleEditJob, handleCopyLink }
}
