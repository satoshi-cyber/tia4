import { useJobsListQuery } from "@/graphql"

export const useJobs = () => {
  const [results] = useJobsListQuery()

  const { data, fetching } = results

  return { data, fetching }
}