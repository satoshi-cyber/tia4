import { useJobQuery, } from "@/graphql";
import { useRouter } from "next/router";
import { URLS, DOMAIN } from "@/config";

export const usePublicJob = () => {
  const router = useRouter()

  const jobId = String(router.query.applyJobId)

  const [{ fetching, data }] = useJobQuery({
    variables: { id: jobId }
  })

  const url = encodeURIComponent(`${DOMAIN}${URLS.APPLY.replace('[applyJobId]', jobId)}`)

  const href = `https://theinterview.page.link/?link=${url}`

  const jobTitle = data?.job.title

  const companyName = data?.job.company?.name || 'placeholder'

  const companyWebsite = data?.job.company?.website

  const jobDescription = data?.job.description

  const isLoading = fetching || !router.isReady

  return {
    isLoading,
    href,
    jobTitle,
    jobDescription,
    companyName,
    companyWebsite
  };
};
