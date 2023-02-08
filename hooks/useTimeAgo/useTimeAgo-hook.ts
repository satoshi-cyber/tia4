import { timeAgo } from "@/utils"


export const useTimeAgo = (date?: string) => {
  if (!date) {
    return undefined
  }

  return timeAgo(date)
}