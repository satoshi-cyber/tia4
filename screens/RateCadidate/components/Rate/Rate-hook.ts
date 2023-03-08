import { TOAST_OPTIONS, URLS } from "@/config"
import { useInterviewRateQuery, useRateInterviewMutation } from "@/graphql"
import { useUser } from "@/hooks"
import clsx from "clsx"
import { useRouter } from "next/router"
import { useMemo, useState } from "react"
import { toast } from "react-toastify"

import { CLASS_NAMES, DEMO_INTERVIEW_ID, PUSH_DELAY, TOAST_MESSAGE } from "./Rate-constants"

export const useRate = ({ className }: { className?: string }) => {
  const { companyId } = useUser()

  const router = useRouter();

  const interviewId = router.query.interviewId as string;

  const [score, setScore] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const context = useMemo(() => ({ additionalTypenames: ['Rate'] }), []);

  const [{ fetching, data }] = useInterviewRateQuery({ variables: { companyId: companyId!, interviewId }, pause: !companyId || !interviewId || interviewId === DEMO_INTERVIEW_ID, context })

  const [{ fetching: submitting }, rateInterview] = useRateInterviewMutation()

  const classNames = {
    ...CLASS_NAMES,
    constainer: clsx(CLASS_NAMES.container, className)
  }

  const handleRate = (index: number) => {
    setScore(index)
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
  }

  const handleConfirm = async () => {
    if (interviewId === DEMO_INTERVIEW_ID) {
      toast.success(TOAST_MESSAGE.success, TOAST_OPTIONS)

      setTimeout(() => router.push(URLS.RATE), PUSH_DELAY)

      return
    }

    const { error } = await rateInterview({ companyId: companyId!, input: { interviewId, value: score } }, { additionalTypenames: ['Rate'] })

    if (error) {
      toast.error(TOAST_MESSAGE.error, TOAST_OPTIONS)

      return
    }

    toast.success(TOAST_MESSAGE.success, TOAST_OPTIONS)

    setTimeout(() => router.push(URLS.RATE), PUSH_DELAY)
  }

  const value = data?.interviewRate?.value

  return {
    fetching,
    submitting,
    value,
    score,
    classNames,
    isDialogOpen,
    handleConfirm,
    closeDialog,
    handleRate
  }
}