import { useJobsListQuery } from "@/graphql"
import { useMemo } from "react"

import { SKELETON_JOBS } from "./List-constants"

export const useJobs = () => {
  const context = useMemo(() => ({ additionalTypenames: ['Job'] }), [])

  const [results] = useJobsListQuery({ context })

  const { data, fetching } = results

  const jobs = fetching ? SKELETON_JOBS : data?.jobs

  return { jobs, fetching }
}