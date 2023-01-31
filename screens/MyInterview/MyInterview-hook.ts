import { useMyInterviewQuery } from "@/graphql";
import { useTimeAgo } from "@/hooks";
import { useRouter } from "next/router";

export const useMyInterview = () => {
  const router = useRouter()


  const interviewId = String(router.query.interviewId)

  const [{ fetching, data }] = useMyInterviewQuery({ variables: { id: interviewId } })

  const appliedDate = useTimeAgo(data?.myInterview.createdAt)

  const title = data?.myInterview.job?.title || undefined
  const answers = data?.myInterview.answers || undefined
  const companyName = data?.myInterview.job?.company?.name || undefined
  const companyLogo = data?.myInterview.job?.company?.avatarUrl || undefined

  return {
    fetching,
    title,
    answers,
    data,
    appliedDate,
    companyName,
    companyLogo
  }
};
