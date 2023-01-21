import { useProfileQuery } from "@/graphql"
import { useUser } from "@/hooks/useUser"
import { MouseEvent } from 'react'

export const useProfile = () => {
  const { logout } = useUser()

  const [{ fetching: loading, data }] = useProfileQuery()

  const label = data?.profile.firstName ? `${data?.profile.firstName} ${data?.profile.lastName}` : 'Profile'

  const avatarUrl = data?.profile.avatarUrl || undefined

  const handleLogout = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    logout()
  }

  return { loading, handleLogout, label, avatarUrl }
}