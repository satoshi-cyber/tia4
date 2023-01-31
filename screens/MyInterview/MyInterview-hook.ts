import { useMyInterviewQuery } from "@/graphql";
import { useRouter } from "next/router";

export const useMyInterview = () => {
  const router = useRouter()

  const interviewId = String(router.query.interviewId)

  const [{ fetching, data }] = useMyInterviewQuery({ variables: { id: interviewId } })

  const title = data?.myInterview.job?.title || undefined

  const answers = data?.myInterview.answers || undefined

  return {
    fetching,
    title,
    answers,
    data
  }
};
