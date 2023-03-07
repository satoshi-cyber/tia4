import { useCompanyInfoQuery } from "@/graphql"
import { useRouter } from "next/router"
import { useMemo } from "react"

export const useJoinCompany = () => {
  const router = useRouter()

  const companyId = router.query.companyId as string

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