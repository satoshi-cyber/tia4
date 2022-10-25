import { URLS } from "@/config"
import { useRouter } from "next/router"

interface ItemOptions {
  jobId: string | number
}

export const useItem = ({ jobId }: ItemOptions) => {
  const router = useRouter()

  const handleEditJob = () => {
    router.push({ pathname: URLS.JOB, query: { jobId } })
  }

  return { handleEditJob }
}
