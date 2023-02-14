import { TOAST_OPTIONS, URLS } from '@/config';
import { useDeleteInterviewMutation } from '@/graphql';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { PUSH_DELAY, TOAST_MESSAGE } from './SettingsMenu-constants';

export const useSettingsMenu = () => {
  const router = useRouter()

  const [, deleteInterview] = useDeleteInterviewMutation();

  const interviewId = String(router.query.interviewId)

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

  return { handleDeleteInterview };
};
