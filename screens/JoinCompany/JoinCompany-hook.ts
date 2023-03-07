import { TOAST_OPTIONS, URLS } from "@/config"
import { useCompanyInfoQuery, useJoinCompanyMutation } from "@/graphql"
import { useUser } from "@/hooks"
import { useRouter } from "next/router"
import { useMemo } from "react"
import { toast } from "react-toastify"

import { DELAY, TOAST_MESSAGE } from "./JoinCompany-constants"

export const useJoinCompany = () => {
  const router = useRouter()

  const { refreshToken } = useUser()

  const companyId = router.query.companyId as string

  const context = useMemo(() => ({ additionalTypenames: ['Company'] }), [])

  const [{ fetching, data }] = useCompanyInfoQuery({ context, variables: { companyId: companyId! }, pause: !companyId, })

  const [{ fetching: submitting }, joinCompany] = useJoinCompanyMutation()

  const title = data?.company?.name || undefined
  const avatar = data?.company?.avatarUrl || ''


  const handleJoinCompany = async () => {
    const { error } = await joinCompany({ companyId })

    if (error) {
      toast.error(TOAST_MESSAGE.error, TOAST_OPTIONS)

      return
    }

    await refreshToken()

    toast.success(TOAST_MESSAGE.success, TOAST_OPTIONS)

    setTimeout(() => router.push(URLS.COMPANY), DELAY)

  }

  return {
    fetching,
    avatar,
    title,
    submitting,
    handleJoinCompany
  }
}