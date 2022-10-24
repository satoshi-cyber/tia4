import { useJobsListQuery } from "@/graphql"

import { SKELETON_JOBS } from "./List-constants"

export const useJobs = () => {
  const [results] = useJobsListQuery()

  const { data, fetching } = results

  const jobs = fetching ? SKELETON_JOBS : data?.jobs

  return { jobs, fetching }
}