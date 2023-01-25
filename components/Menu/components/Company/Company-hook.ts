import { useCompanyInfoQuery } from "@/graphql"
import { useUser } from "@/hooks"
import { useMemo } from "react"

export const useCompany = () => {
  const { companyId } = useUser()

  const context = useMemo(() => ({ additionalTypenames: ['Company'] }), [])

  const [{ fetching, data }] = useCompanyInfoQuery({ context, variables: { companyId: companyId! }, pause: !companyId, })

  const title = data?.company?.name || undefined

  return {
    fetching,
    title
  }
}