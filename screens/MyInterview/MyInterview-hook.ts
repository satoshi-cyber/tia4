import { TOAST_OPTIONS, URLS } from '@/config';
import { useTimeAgo } from '@/hooks';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { PUSH_DELAY, TOAST_MESSAGE } from './MyInterview-constants';
import { UseCases } from '@/useCases';

export const useMyInterview = () => {
  const router = useRouter();

  const { trigger: deleteInterview, isMutating } =
    UseCases.deleteInterview.mutate();

  const interviewId = String(router.query.interviewId);

  const { data, isLoading } = UseCases.myInterview.load(
    { id: interviewId },
    { revalidateOnFocus: false }
  );

  const appliedDate = useTimeAgo(data?.createdAt);

  const title = data?.job?.title || undefined;
  const answers = data?.answers || undefined;
  const companyName = data?.job?.company?.name || undefined;
  const companyLogo = data?.job?.company?.avatarUrl || undefined;

  const handleDeleteInterview = async () => {
    const toastMessage = TOAST_MESSAGE.DELETE_INTERVIEW;

    try {
      await deleteInterview({ id: interviewId });

      toast.success(toastMessage.success, TOAST_OPTIONS);

      setTimeout(() => router.push(URLS.MY_INTERVIEWS), PUSH_DELAY);
    } catch (e) {
      toast.error(toastMessage.error, TOAST_OPTIONS);
    }
  };

  const settingItems = [
    {
      label: 'Delete interview',
      activeColor: 'text-red-800',
      onClick: handleDeleteInterview,
    },
  ];

  return {
    isLoading,
    isMutating,
    title,
    answers,
    data,
    appliedDate,
    companyName,
    companyLogo,
    settingItems,
  };
};
