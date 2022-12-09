import { useProfileQuery } from "@/graphql"
import { useUser } from "@/hooks"
import { MouseEvent } from 'react'

export const useProfile = () => {
  const { logout } = useUser()

  const [{ fetching: loading, data }] = useProfileQuery()

  const label = data?.profile.firstName ? `${data?.profile.firstName} ${data?.profile.lastName}` : 'Profile'

  const handleLogout = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    logout()
  }

  return { loading, handleLogout, label }
}