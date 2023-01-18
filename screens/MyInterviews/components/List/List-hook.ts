import { useMyInterviewsQuery } from "@/graphql"
import { useMemo } from "react"

import { SKELETON_INTERVIEWS } from "./List-constants"

export const useMyInterviews = () => {
  const context = useMemo(() => ({ additionalTypenames: ['Interview'] }), [])

  const [{ data, fetching }] = useMyInterviewsQuery({ context })

  const myInterviews = fetching ? SKELETON_INTERVIEWS : data?.myInterviews

  return { myInterviews, fetching }
}