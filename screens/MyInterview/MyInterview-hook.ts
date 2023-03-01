import { TOAST_OPTIONS, URLS } from "@/config";
import { useDeleteInterviewMutation, useMyInterviewQuery } from "@/graphql";
import { useTimeAgo } from "@/hooks";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { PUSH_DELAY, TOAST_MESSAGE } from "./MyInterview-constants";

export const useMyInterview = () => {
  const router = useRouter()
  const [, deleteInterview] = useDeleteInterviewMutation();

  const interviewId = String(router.query.interviewId)

  const [{ fetching, data }] = useMyInterviewQuery({ variables: { id: interviewId } })

  const appliedDate = useTimeAgo(data?.myInterview.createdAt)

  const title = data?.myInterview.job?.title || undefined
  const answers = data?.myInterview.answers || undefined
  const companyName = data?.myInterview.job?.company?.name || undefined
  const companyLogo = data?.myInterview.job?.company?.avatarUrl || undefined


  const handleDeleteInterview = async () => {
    const { error } = await deleteInterview({ id: interviewId })

    const toastMessage = TOAST_MESSAGE.DELETE_INTERVIEW

    if (error) {
      toast.error(toastMessage.error, TOAST_OPTIONS)

      return
    }

    toast.success(toastMessage.success, TOAST_OPTIONS)

    setTimeout(() => router.push(URLS.MY_INTERVIEWS), PUSH_DELAY)
  };

  const settingItems = [{
    label: 'Delete interview',
    activeColor: 'text-red-800',
    onClick: handleDeleteInterview
  }]

  return {
    fetching,
    title,
    answers,
    data,
    appliedDate,
    companyName,
    companyLogo,
    settingItems
  }
};
