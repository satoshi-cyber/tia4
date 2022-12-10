import { useJobsListQuery } from "@/graphql"
import { useUser } from "@/hooks"
import { useMemo } from "react"

import { SKELETON_JOBS } from "./List-constants"

export const useJobs = () => {
  const { companyId } = useUser()

  const context = useMemo(() => ({ additionalTypenames: ['Job'] }), [])

  const [results] = useJobsListQuery({ context, variables: { companyId: companyId! }, pause: !companyId })

  const { data, fetching } = results

  const jobs = fetching ? SKELETON_JOBS : data?.jobs

  return { jobs, fetching }
}