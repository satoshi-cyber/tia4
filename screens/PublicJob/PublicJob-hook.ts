import { useJobQuery, } from "@/graphql";
import { useRouter } from "next/router";
import { URLS } from "@/config";

export const usePublicJob = () => {
  const router = useRouter()

  const jobId = String(router.query.applyJobId)

  const [{ fetching, data }] = useJobQuery({
    variables: { id: jobId }
  })

  const handleApply = () => {
    router.push(
      URLS.APPLY.replace('[applyJobId]', jobId)
    );
  };

  const jobTitle = data?.job.title

  const companyName = data?.job.company?.name || 'placeholder'

  const jobDescription = data?.job.description

  return {
    fetching,
    handleApply,
    jobTitle,
    jobDescription,
    companyName
  };
};
