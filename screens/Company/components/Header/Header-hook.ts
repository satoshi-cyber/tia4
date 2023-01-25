import { useCompanyInfoQuery } from "@/graphql"
import { useUser } from "@/hooks"
import { useMemo } from "react"

export const useCompanyHeader = () => {
  const { companyId } = useUser()

  const context = useMemo(() => ({ additionalTypenames: ['Company'] }), [])

  const [{ fetching, data }] = useCompanyInfoQuery({ context, variables: { companyId: companyId! }, pause: !companyId, })

  const title = data?.company?.name || undefined
  const avatar = data?.company?.avatarUrl || ''

  return {
    fetching,
    avatar,
    title
  }
}