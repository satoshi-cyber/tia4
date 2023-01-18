import { useMyInterviewsQuery } from "@/graphql"

export const useMyInterviews = () => {


  const [{ fetching: loading, data }] = useMyInterviewsQuery()

  const myInterviews = data?.myInterviews


  return {
    loading,
    myInterviews
  }
}
